/**
 * AIBackground — Editorial dot-grid background
 *
 * Replaces the old canvas particle animation with the brand-aligned
 * CSS dot-grid pattern used across the editorial warm-paper design system.
 * This component is kept for backwards compatibility with any pages that
 * still import it, but it now renders a static dot-grid overlay instead
 * of an animated particle canvas.
 */
const AIBackground = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "radial-gradient(circle, rgba(14, 14, 11, 0.07) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default AIBackground;
