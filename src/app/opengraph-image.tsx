import { ImageResponse } from "next/og";

/**
 * 사이트 루트 OG 이미지.
 * - Next.js 16 file convention (app/opengraph-image.tsx) 을 그대로 사용합니다.
 * - Innogrid Deep Blue (#0042FF) 와 Light Cyan (#68CAFF) 를 그대로 가져옵니다.
 * - 외부 폰트 fetch 없이 system stack 으로 렌더해 안정성과 속도를 우선합니다.
 */

export const runtime = "edge";
export const alt = "에이전틱 코딩 하네스 — Innogrid";
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #050816 0%, #0a0f24 50%, #0042FF 180%)",
          color: "#fafafa",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', 'Apple SD Gothic Neo', sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#68CAFF",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                borderRadius: 2,
                background: "#0042FF",
              }}
            />
            Innogrid · Agentic Coding Harness
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 980,
            }}
          >
            모델보다 작업 환경이 중요해지는 시대의 하네스 엔지니어링
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              maxWidth: 720,
              fontSize: 24,
              lineHeight: 1.45,
              color: "#a1a1aa",
            }}
          >
            <span>Claude Code · Codex · MCP · Skills · Hooks · Subagents</span>
            <span style={{ color: "#fafafa" }}>
              사실 기반, 한국어 존댓말, 출처 인용으로만 작성된 내부 자료 사이트
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 20,
              color: "#68CAFF",
              border: "2px solid #0042FF",
              borderRadius: 14,
              padding: "14px 22px",
              background: "rgba(0, 66, 255, 0.12)",
            }}
          >
            aiagentic-coding-harness.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
