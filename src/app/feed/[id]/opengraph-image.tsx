import { ImageResponse } from "next/og";
import { mockDares } from "@/lib/mock-data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ id: string }>;
}

const categoryColors: Record<string, string> = {
  Fun:      "#7c3aed",
  Social:   "#2563eb",
  Creative: "#db2777",
  Video:    "#dc2626",
  Public:   "#16a34a",
};

export default async function OGImage({ params }: Props) {
  const { id } = await params;
  const dare = mockDares.find((d) => d.id === id);

  const title    = dare?.title    ?? "DareMe Challenge";
  const reward   = dare?.reward   ?? 0;
  const category = dare?.category ?? "Challenge";
  const catColor = categoryColors[category] ?? "#7c3aed";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative orb */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.25)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.2)",
            filter: "blur(50px)",
          }}
        />

        {/* Brand + category row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
          <div
            style={{
              background: "#7c3aed",
              color: "white",
              borderRadius: 12,
              padding: "8px 20px",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            DareMe
          </div>
          <div
            style={{
              background: catColor,
              color: "white",
              borderRadius: 24,
              padding: "6px 16px",
              fontSize: 16,
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            {category}
          </div>
        </div>

        {/* Dare title */}
        <div
          style={{
            color: "white",
            fontSize: title.length > 50 ? 44 : 56,
            fontWeight: 800,
            lineHeight: 1.15,
            flex: 1,
            display: "flex",
            alignItems: "center",
            letterSpacing: "-1px",
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>
            dareme.app
          </div>
          <div
            style={{
              background: "#f59e0b",
              color: "#1a1005",
              borderRadius: 48,
              padding: "14px 32px",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            ${reward} reward
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
