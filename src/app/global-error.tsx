"use client"; // Error boundaries must be Client Components

/* Replaces the root layout when it is the layout itself that fails, so it can
   rely on neither globals.css nor the font variables — all styling is inline. */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          background: "linear-gradient(135deg, #060d1a 0%, #0c1e38 45%, #082530 100%)",
          color: "#E2EDF5",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textAlign: "center",
        }}
      >
        <title>Something went wrong</title>
        <div style={{ maxWidth: 460 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#8BADC2", marginBottom: 28 }}>
            The site hit an unexpected error. Reloading usually fixes it — otherwise
            reach me at{" "}
            <a href="mailto:muhammadshakoor86@gmail.com" style={{ color: "#00C8FF" }}>
              muhammadshakoor86@gmail.com
            </a>
            .
          </p>
          <button
            onClick={() => unstable_retry()}
            style={{
              padding: "13px 24px",
              borderRadius: 14,
              background: "#5B3CF5",
              color: "#fff",
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          {error.digest && (
            <p style={{ marginTop: 24, fontSize: 11, color: "#3D5A72", fontFamily: "monospace" }}>
              Reference: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
