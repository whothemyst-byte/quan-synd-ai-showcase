import type { MouseEventHandler } from "react";

export type Tier = "Frontier" | "Capable" | "Efficient";

export type Model = {
  rank: number;
  name: string;
  provider: string;
  avatar: string;
  avatarBg: string;
  avatarColor: string;
  quan: number;
  reasoning: number;
  context: number;
  accuracy: number;
  efficiency: number;
  creativity: number;
  reliability: number;
  cost: "$" | "$$" | "$$$";
  speed: "Fast" | "Medium" | "Slow";
  trend: "up" | "down" | "stable";
  tier: Tier;
  pick: boolean;
  verdict: string;
  latestCohort?: boolean;
  externalScore?: number | null;
  externalAlgorithms?: number | null;
  externalDebugging?: number | null;
  externalRefactoring?: number | null;
  externalGeneration?: number | null;
  externalUi?: number | null;
  externalSecurity?: number | null;
  externalThroughputTps?: number | null;
  externalTtftMs?: number | null;
  externalCostUsd?: number | null;
};

type QuanBenchCardProps = {
  model: Model;
  displayRank: number;
  isTopThree: boolean;
  isExpanded: boolean;
  index: number;
  tierColor: string;
  waveformSvg: string;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const trendSymbol: Record<Model["trend"], string> = {
  up: "↑",
  down: "↓",
  stable: "—",
};

const tierLabel: Record<Tier, string> = {
  Frontier: "I · Frontier",
  Capable: "II · Capable",
  Efficient: "III · Efficient",
};

const costLabel: Record<Model["cost"], string> = {
  $: "Lean",
  $$: "Standard",
  $$$: "Premium",
};

const QuanBenchCard = ({ model, displayRank, isTopThree, isExpanded, index, tierColor, waveformSvg, onClick }: QuanBenchCardProps) => {
  const dims = [
    { key: "reasoning", short: "RES", value: model.reasoning },
    { key: "context", short: "CON", value: model.context },
    { key: "accuracy", short: "ACC", value: model.accuracy },
    { key: "efficiency", short: "EFF", value: model.efficiency },
    { key: "creativity", short: "CRE", value: model.creativity },
    { key: "reliability", short: "REL", value: model.reliability },
  ];

  return (
    <div
      className={`qb-model-card ${isExpanded ? "expanded" : ""} ${isTopThree ? "qb-model-card-top3" : ""}`}
      style={{
        ["--tier-color" as string]: tierColor,
        animationDelay: `${index * 0.04}s`,
        display: "flex",
        flexDirection: "column",
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Pick badge — sits above the header row, no overlap */}
      {model.pick && <div className="qb-pick-badge">● Quansynd's Pick</div>}

      <div className="qb-card-header">
        <div className="qb-card-head-left">
          <div className="qb-avatar" style={{ background: model.avatarBg, color: model.avatarColor }}>
            {model.avatar}
          </div>
          <div>
            <h3>{model.name}</h3>
            <p>{model.provider}</p>
            {model.latestCohort && <span className="qb-latest-pill">Latest Cohort</span>}
          </div>
        </div>
        <div className="qb-card-head-right">
          <div className="qb-rank-chip">Rank #{displayRank}</div>
          <div className="qb-tier-badge" style={{ color: tierColor, borderColor: tierColor }}>
            {tierLabel[model.tier]}
          </div>
        </div>
      </div>

      <div className="qb-waveform" dangerouslySetInnerHTML={{ __html: waveformSvg }} />

      <div className="qb-mini-dims">
        {dims.map((dim) => (
          <div key={`${model.rank}-${dim.key}`}>
            <span>{dim.short}</span>
            <strong>{dim.value}</strong>
          </div>
        ))}
      </div>

      <div className="qb-score-row">
        <div>
          <span>QUAN SCORE</span>
          <div className="qb-quan-num">{model.quan.toFixed(1)}</div>
        </div>
        <div className="qb-score-meta">
          <span className="qb-cost-tag">{costLabel[model.cost]}</span>
          <span className="qb-speed-tag">{model.speed}</span>
          <span className="qb-trend-tag">{trendSymbol[model.trend]}</span>
        </div>
      </div>
    </div>
  );
};

export default QuanBenchCard;
