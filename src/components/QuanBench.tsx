import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuanBenchCard, { type Model, type Tier } from "@/components/QuanBenchCard";
import "@/styles/quan-bench.css";

type ViewMode = "cards" | "matrix";

type TierFilter = "All" | Tier;

const tierColor: Record<Tier, string> = {
  Frontier: "#c8882a",
  Capable: "#5a7a3a",
  Efficient: "#3a6a8a",
};

const trendSymbol: Record<Model["trend"], string> = {
  up: "↑",
  down: "↓",
  stable: "—",
};

const methodology = [
  {
    num: "01 · 20%",
    title: "Reasoning",
    text: "Multi-step deduction, causal inference, and structured decomposition of ambiguous problems.",
    weight: "Highest weight",
  },
  {
    num: "02 · 20%",
    title: "Accuracy",
    text: "Factual correctness and hallucination resistance across a curated set of verifiable knowledge tasks.",
    weight: "Highest weight",
  },
  {
    num: "03 · 18%",
    title: "Contextual Grasp",
    text: "Coherence over long-form, multi-constraint prompts and extended conversation chains.",
    weight: "High weight",
  },
  {
    num: "04 · 17%",
    title: "Reliability",
    text: "Consistency across repeated identical prompts and resistance to adversarial edge cases.",
    weight: "High weight",
  },
  {
    num: "05 · 15%",
    title: "Efficiency",
    text: "Precision over volume - delivering concise, targeted responses without unnecessary verbosity.",
    weight: "Medium weight",
  },
  {
    num: "06 · 10%",
    title: "Creativity",
    text: "Novel framing and original output generation under open-ended, unconstrained briefs.",
    weight: "Base weight",
  },
];

const QuanBench = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [cardModels, setCardModels] = useState<Model[]>([]);
  const [matrixModels, setMatrixModels] = useState<Model[]>([]);
  const [searchText, setSearchText] = useState("");
  const [providerFilter, setProviderFilter] = useState("All providers");
  const [costFilter, setCostFilter] = useState("Any cost");
  const [currentView, setCurrentViewState] = useState<ViewMode>("cards");
  const [activeTier, setActiveTierState] = useState<TierFilter>("All");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const scatterRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    document.body.classList.add("qb-body");
    return () => {
      document.body.classList.remove("qb-body");
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/data/quanbench.json");
      const data = (await response.json()) as Model[];
      setModels(data);
      setCardModels(data);
      setMatrixModels(data);
    };

    void load();
  }, []);

  const setView = (v: ViewMode) => {
    setCurrentViewState(v);
    if (v === "matrix") {
      renderMatrix();
    }
  };

  const setTier = (_el: HTMLElement | null, tier: TierFilter) => {
    setActiveTierState(tier);
    setExpandedCard(null);
  };

  const getFiltered = () => {
    const query = searchText.trim().toLowerCase();
    return models.filter((model) => {
      const bySearch = !query || model.name.toLowerCase().includes(query) || model.provider.toLowerCase().includes(query);
      const byProvider = providerFilter === "All providers" || model.provider === providerFilter;
      const byCost = costFilter === "Any cost" || model.cost === costFilter;
      const byTier = activeTier === "All" || model.tier === activeTier;
      return bySearch && byProvider && byCost && byTier;
    });
  };

  const renderCards = (modelsToRender: Model[]) => {
    setCardModels(modelsToRender);
  };

  const renderMatrix = (modelsToRender?: Model[]) => {
    setMatrixModels(modelsToRender ?? getFiltered());
  };

  const applyFilters = () => {
    const filtered = getFiltered();
    renderCards(filtered);
    if (currentView === "matrix") {
      renderMatrix(filtered);
    }
  };

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models, searchText, providerFilter, costFilter, activeTier, currentView]);

  const makeWaveform = (model: Model) => {
    const scores = [model.reasoning, model.context, model.accuracy, model.efficiency, model.creativity, model.reliability];
    const points: string[] = [];

    for (let i = 0; i <= 40; i += 1) {
      const t = i / 40;
      const segmentIndex = Math.min(4, Math.floor(t * 5));
      const localT = t * 5 - segmentIndex;
      const v1 = scores[segmentIndex] / 100;
      const v2 = scores[segmentIndex + 1] / 100;
      const interpolated = v1 + (v2 - v1) * localT;
      const noise = Math.sin(i * 1.3) * 0.04 + Math.cos(i * 0.7) * 0.02;
      const y = 36 - (interpolated + noise) * (36 - 6) - 3;
      const x = i * (240 / 40);
      points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }

    const linePath = `M ${points.join(" L ")}`;
    const areaPath = `${linePath} L 240,36 L 0,36 Z`;
    const color = tierColor[model.tier];
    const gradientId = `qb-wave-grad-${model.rank}`;

    return `
      <svg viewBox="0 0 240 36" width="100%" height="36" aria-hidden="true">
        <defs>
          <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.15" />
            <stop offset="100%" stop-color="${color}" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path d="${areaPath}" fill="url(#${gradientId})"></path>
        <path d="${linePath}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"></path>
      </svg>
    `;
  };

  const makeRadar = (model: Model, size: number) => {
    const axes = ["reasoning", "context", "accuracy", "efficiency", "creativity", "reliability"] as const;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 18;
    const angleStep = (Math.PI * 2) / axes.length;
    const color = tierColor[model.tier];

    const axisPoints = axes.map((_, idx) => {
      const angle = -Math.PI / 2 + idx * angleStep;
      return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, angle };
    });

    const gridPolygons = [0.25, 0.5, 0.75, 1]
      .map((scale) => {
        const points = axisPoints
          .map((p) => `${(cx + (p.x - cx) * scale).toFixed(2)},${(cy + (p.y - cy) * scale).toFixed(2)}`)
          .join(" ");
        return `<polygon points="${points}" fill="none" stroke="rgba(245,240,232,0.08)" stroke-width="0.5" />`;
      })
      .join("");

    const axisLines = axisPoints
      .map(
        (p) =>
          `<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(2)}" y2="${p.y.toFixed(2)}" stroke="rgba(245,240,232,0.08)" stroke-width="0.5" />`,
      )
      .join("");

    const dataPoints = axes.map((axis, idx) => {
      const pct = model[axis] / 100;
      const full = axisPoints[idx];
      return {
        x: cx + (full.x - cx) * pct,
        y: cy + (full.y - cy) * pct,
      };
    });

    const dataPolygon = dataPoints.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
    const dots = dataPoints
      .map((p) => `<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="2.5" fill="${color}" />`)
      .join("");

    const labels = axes
      .map((axis, idx) => {
        const p = axisPoints[idx];
        const lx = cx + Math.cos(p.angle) * (r + 13);
        const ly = cy + Math.sin(p.angle) * (r + 13);
        return `<text x="${lx.toFixed(2)}" y="${ly.toFixed(2)}" fill="rgba(245,240,232,0.35)" font-size="6.5" font-family="'Geist Mono', monospace" text-anchor="middle" dominant-baseline="middle">${axis.slice(0, 3).toUpperCase()}</text>`;
      })
      .join("");

    return `
      <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" aria-hidden="true">
        ${gridPolygons}
        ${axisLines}
        <polygon points="${dataPolygon}" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-width="1.5" />
        ${dots}
        ${labels}
      </svg>
    `;
  };

  const toggleExpand = (model: Model, _cardElement?: HTMLElement | null) => {
    if (expandedCard === model.rank) {
      setExpandedCard(null);
      return;
    }

    setExpandedCard(model.rank);
  };

  const drawScatter = () => {
    if (!scatterRef.current) {
      return;
    }

    const svg = scatterRef.current;
    svg.querySelectorAll(".qb-scatter-point,.qb-scatter-label").forEach((node) => node.remove());

    const width = 380;
    const height = 280;
    const pad = 30;
    const plotWidth = width - 60;
    const plotHeight = height - 60;
    const ns = "http://www.w3.org/2000/svg";

    models.forEach((model) => {
      const weightedIntelligence = model.reasoning * 0.4 + model.accuracy * 0.35 + model.context * 0.25;
      const x = pad + ((model.efficiency - 65) / (100 - 65)) * plotWidth;
      const y = height - pad - ((weightedIntelligence - 60) / (100 - 60)) * plotHeight;
      const color = tierColor[model.tier];

      const circle = document.createElementNS(ns, "circle");
      circle.setAttribute("class", "qb-scatter-point");
      circle.setAttribute("cx", x.toFixed(2));
      circle.setAttribute("cy", y.toFixed(2));
      circle.setAttribute("r", model.pick ? "7" : "5");
      circle.setAttribute("fill", color);
      circle.setAttribute("fill-opacity", "0.75");
      circle.setAttribute("stroke", color);
      circle.setAttribute("stroke-width", "1");

      const label = document.createElementNS(ns, "text");
      label.setAttribute("class", "qb-scatter-label");
      label.setAttribute("x", (x + 8).toFixed(2));
      label.setAttribute("y", (y + 1).toFixed(2));
      label.setAttribute("fill", "var(--qb-scatter-label)");
      label.setAttribute("font-size", "7.5");
      label.setAttribute("font-family", "'Geist Mono', monospace");
      label.textContent = model.name.split(" ").slice(0, 2).join(" ");

      svg.appendChild(circle);
      svg.appendChild(label);
    });
  };

  useEffect(() => {
    drawScatter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [models]);

  const providers = useMemo(
    () => ["All providers", "Anthropic", "OpenAI", "Google", "xAI", "Mistral", "Meta", "DeepSeek", "Alibaba"],
    [],
  );

  return (
    <div className="qb-page">
      <Navbar />

      <section className="qb-hero">
        <div className="qb-hero-left">
          <div className="qb-eyebrow">
            <span className="qb-rule" />
            <span>Intelligence Observatory · 2025</span>
          </div>

          <h1>
            The AI
            <br />
            models we
            <br />
            <em>actually trust</em>
          </h1>

          <p>
            Quan Bench profiles leading AI models across six dimensions of real business intelligence. Not synthetic
            benchmarks - applied judgment. We publish our scores openly.
          </p>

          <div className="qb-meta-chips">
            <div>
              <span className="qb-pulse-dot" />
              Continuously updated
            </div>
            <div>10 models profiled</div>
            <div>200+ prompts / dimension</div>
          </div>
        </div>

        <div className="qb-scatter-wrap">
          <div className="qb-scatter-bar">
            <span>Intelligence vs Efficiency — Model Map</span>
            <span>→ scatter</span>
          </div>
          <svg id="scatterSvg" ref={scatterRef} viewBox="0 0 380 280" width="100%" aria-label="Model scatter map">
            <defs>
              <pattern id="qb-grid" width="38" height="28" patternUnits="userSpaceOnUse">
                <path className="qb-scatter-grid" d="M 38 0 L 0 0 0 28" fill="none" stroke="rgba(14,14,11,0.06)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect x="30" y="30" width="320" height="220" fill="url(#qb-grid)" />
            <line className="qb-scatter-cross" x1="30" y1="140" x2="350" y2="140" stroke="rgba(14,14,11,0.07)" strokeWidth="0.5" strokeDasharray="4,3" />
            <line className="qb-scatter-cross" x1="190" y1="30" x2="190" y2="250" stroke="rgba(14,14,11,0.07)" strokeWidth="0.5" strokeDasharray="4,3" />
            <text x="190" y="272" textAnchor="middle" className="qb-axis-label">
              EFFICIENCY →
            </text>
            <text x="12" y="140" transform="rotate(-90 12 140)" textAnchor="middle" className="qb-axis-label">
              INTELLIGENCE →
            </text>
            <text x="333" y="40" className="qb-quad-label">
              Balanced
            </text>
            <text x="38" y="40" className="qb-quad-label">
              Deep
            </text>
            <text x="334" y="245" className="qb-quad-label">
              Fast
            </text>
            <text x="38" y="245" className="qb-quad-label">
              Slow
            </text>
          </svg>
        </div>
      </section>

      <section className="qb-controls">
        <h2 className="qb-section-title">Model Profiles</h2>
        <div className="qb-view-toggle">
          <button type="button" className={currentView === "cards" ? "active" : ""} onClick={() => setView("cards")}>
            ◫ Cards
          </button>
          <button type="button" className={currentView === "matrix" ? "active" : ""} onClick={() => setView("matrix")}>
            ≡ Matrix
          </button>
        </div>
      </section>

      <section className="qb-filters-wrap">
        <div className="qb-filters">
          <input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setExpandedCard(null);
            }}
            placeholder="Search model…"
          />

          <select
            value={providerFilter}
            onChange={(e) => {
              setProviderFilter(e.target.value);
              setExpandedCard(null);
            }}
          >
            {providers.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>

          <select
            value={costFilter}
            onChange={(e) => {
              setCostFilter(e.target.value);
              setExpandedCard(null);
            }}
          >
            {[
              { label: "Any cost", value: "Any cost" },
              { label: "$", value: "$" },
              { label: "$$", value: "$$" },
              { label: "$$$", value: "$$$" },
            ].map((cost) => (
              <option key={cost.value} value={cost.value}>
                {cost.label}
              </option>
            ))}
          </select>

          <div className="qb-tier-chips">
            <button type="button" className={activeTier === "All" ? "active" : ""} onClick={() => setTier(null, "All")}>
              All tiers
            </button>
            <button
              type="button"
              className={activeTier === "Frontier" ? "active" : ""}
              onClick={() => setTier(null, "Frontier")}
            >
              I · Frontier
            </button>
            <button
              type="button"
              className={activeTier === "Capable" ? "active" : ""}
              onClick={() => setTier(null, "Capable")}
            >
              II · Capable
            </button>
            <button
              type="button"
              className={activeTier === "Efficient" ? "active" : ""}
              onClick={() => setTier(null, "Efficient")}
            >
              III · Efficient
            </button>
          </div>
        </div>

        <div className="qb-legend">
          <span>Score scale</span>
          <span className="qb-gradient-bar" />
          <span>0 → 100</span>
          <span>|</span>
          <span>● = Quansynd's Pick</span>
        </div>
      </section>

      {currentView === "cards" ? (
        <section className="qb-grid-wrap">
          <div className="qb-card-grid">
            {cardModels.length === 0 && <div className="qb-empty">No models match</div>}

            {cardModels.map((model, idx) => (
              <div key={model.rank} className="qb-card-slot">
                <QuanBenchCard
                  model={model}
                  isExpanded={expandedCard === model.rank}
                  index={idx}
                  tierColor={tierColor[model.tier]}
                  waveformSvg={makeWaveform(model)}
                  onClick={() => toggleExpand(model, null)}
                />

                {expandedCard === model.rank && (
                  <div className="qb-expand-panel">
                    <div className="qb-expand-col qb-verdict-col">
                      <div className="qb-expand-label">Quan Verdict - {model.name}</div>
                      <p>{model.verdict}</p>
                      <div className="qb-expand-links">
                        <a href="#">Official model page ↗</a>
                        <a href="#">Raw scores ↗</a>
                      </div>
                    </div>

                    <div className="qb-expand-col qb-radar-col">
                      <div dangerouslySetInnerHTML={{ __html: makeRadar(model, 140) }} />
                    </div>

                    <div className="qb-expand-col qb-breakdown-col">
                      <div className="qb-expand-label">Dimension Breakdown</div>
                      <div className="qb-breakdown-list">
                        {[
                          ["Reasoning", model.reasoning],
                          ["Context", model.context],
                          ["Accuracy", model.accuracy],
                          ["Efficiency", model.efficiency],
                          ["Creativity", model.creativity],
                          ["Reliability", model.reliability],
                        ].map(([name, score]) => (
                          <div key={`${model.rank}-${name}`} className="qb-break-row">
                            <span>{name}</span>
                            <div className="qb-break-bar">
                              <div style={{ width: `${score}%`, background: tierColor[model.tier] }} />
                            </div>
                            <strong>{score}</strong>
                          </div>
                        ))}
                      </div>

                      <div className="qb-summary-row">
                        <div>
                          <span>COST</span>
                          <strong style={{ color: tierColor[model.tier] }}>{model.cost}</strong>
                        </div>
                        <div>
                          <span>SPEED</span>
                          <strong className="qb-summary-speed">{model.speed}</strong>
                        </div>
                        <div>
                          <span>RANK</span>
                          <strong className="qb-summary-rank">#{model.rank}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="qb-grid-wrap">
          <div className="qb-matrix-wrap">
            <table className="qb-matrix">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Model</th>
                  <th>Provider</th>
                  <th>Quan Score</th>
                  <th>Reasoning</th>
                  <th>Context</th>
                  <th>Accuracy</th>
                  <th>Efficiency</th>
                  <th>Creativity</th>
                  <th>Reliability</th>
                  <th>Cost</th>
                  <th>Speed</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {matrixModels.map((model, idx) => (
                  <tr key={model.rank} className={idx % 2 === 0 ? "even" : "odd"}>
                    <td>{model.rank}</td>
                    <td>
                      <div className="qb-matrix-name">
                        <span>{model.name}</span>
                        {model.pick && <span className="qb-inline-pick">PICK</span>}
                      </div>
                    </td>
                    <td>{model.provider}</td>
                    <td className="qb-matrix-quan">{model.quan.toFixed(1)}</td>
                    <td>{model.reasoning}</td>
                    <td>{model.context}</td>
                    <td>{model.accuracy}</td>
                    <td>{model.efficiency}</td>
                    <td>{model.creativity}</td>
                    <td>{model.reliability}</td>
                    <td className="qb-matrix-cost">{model.cost}</td>
                    <td>{model.speed}</td>
                    <td className="qb-matrix-trend">{trendSymbol[model.trend]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="qb-method">
        <div className="qb-method-inner">
          <div className="qb-method-head">
            <div>
              <div className="qb-eyebrow qb-eyebrow-dark">
                <span className="qb-rule" />
                <span>Methodology</span>
              </div>
              <h2>
                How we <em>measure</em> intelligence
              </h2>
            </div>
            <p>
              Six axes. Weighted by business impact. Evaluated across 200 standardized prompts per dimension, re-run on
              every major model release.
            </p>
          </div>

          <div className="qb-method-grid">
            {methodology.map((item) => (
              <article key={item.num}>
                <div className="qb-method-num">{item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="qb-method-pill">{item.weight}</span>
              </article>
            ))}
          </div>

          <div className="qb-method-note">
            The Quan Score is a weighted composite. Scores are normalized 0-100. Updated when a major model version
            releases or when cumulative evidence warrants re-evaluation. This is Quansynd's internal evaluation
            framework made public.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QuanBench;




