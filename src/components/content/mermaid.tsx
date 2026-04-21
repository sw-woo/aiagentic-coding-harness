"use client";

import { useEffect, useRef, useState } from "react";

type MermaidProps = {
  chart: string;
  caption?: string;
};

function scaleSvg(svg: string): string {
  return svg.replace(
    /(<svg[^>]*?)(?:\s+style="[^"]*")?>/,
    '$1 style="width:100%;height:auto;min-height:400px">'
  );
}

export function Mermaid({ chart, caption }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          primaryColor: "#1e3a5f",
          primaryTextColor: "#e2e8f0",
          primaryBorderColor: "#3b82f6",
          lineColor: "#64748b",
          secondaryColor: "#1e293b",
          tertiaryColor: "#0f172a",
          fontFamily: "Geist, system-ui, sans-serif",
          fontSize: "16px",
        },
        flowchart: { curve: "basis", padding: 20 },
      });
      const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
      const { svg: rendered } = await mermaid.render(id, chart);
      if (!cancelled) setSvg(rendered);
    })();
    return () => { cancelled = true; };
  }, [chart]);

  return (
    <figure className="my-8">
      <div
        ref={ref}
        className="overflow-x-auto rounded-xl border border-border bg-surface p-4"
        dangerouslySetInnerHTML={{ __html: svg ? scaleSvg(svg) : "" }}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-foreground-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
