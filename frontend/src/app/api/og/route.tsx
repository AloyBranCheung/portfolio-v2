import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          border: "6px solid black",
          boxShadow: "12px 12px 0 black",
          padding: "60px 80px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            margin: 0,
            color: "black",
            textTransform: "uppercase",
            letterSpacing: "-2px",
          }}
        >
          Brandon Cheung
        </h1>
        <div
          style={{
            background: "black",
            color: "white",
            padding: "16px 32px",
            fontSize: 32,
            fontWeight: 700,
            border: "4px solid black",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Software Developer
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
