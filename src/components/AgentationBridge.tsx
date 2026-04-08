import { useEffect, useState, type ComponentType } from "react";

export function AgentationBridge() {
  const [Agentation, setAgentation] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return;
    }

    let active = true;

    void import("agentation").then((mod) => {
      if (!active) {
        return;
      }

      setAgentation(() => mod.Agentation as ComponentType);
    });

    return () => {
      active = false;
    };
  }, []);

  if (!import.meta.env.DEV || !Agentation) {
    return null;
  }

  return <Agentation />;
}
