import { type LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  category?: string;
}

const ServiceCard = ({ icon: Icon, title, description, features, category }: ServiceCardProps) => {
  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--rule)",
        borderRadius: "8px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        height: "100%",
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(200,136,42,0.35)";
        el.style.boxShadow = "0 4px 24px -8px rgba(200,136,42,0.18)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--rule)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Category Tag */}
      {category && (
        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--amber)",
            fontWeight: 500,
          }}
        >
          {category}
        </span>
      )}

      {/* Icon */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "6px",
          background: "var(--amber)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={20} color="#fff" />
      </div>

      {/* Text */}
      <div>
        <h3
          style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "18px",
            letterSpacing: "-0.01em",
            color: "var(--ink)",
            marginBottom: "8px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "'Geist', system-ui, sans-serif",
            fontSize: "14px",
            color: "var(--muted-ui)",
            lineHeight: "1.65",
          }}
        >
          {description}
        </p>
      </div>

      {/* Features */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px", flex: 1 }}>
        {features.map((feature, i) => (
          <li
            key={i}
            style={{
              fontFamily: "'Geist', system-ui, sans-serif",
              fontSize: "13px",
              color: "var(--muted-ui)",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              lineHeight: "1.5",
            }}
          >
            <span style={{ color: "var(--amber)", fontWeight: 600, flexShrink: 0 }}>—</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
