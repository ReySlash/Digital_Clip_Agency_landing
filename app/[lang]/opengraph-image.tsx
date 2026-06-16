import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getBrandLogoDataUrl() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo2_no_bg.png"));

  return `data:image/png;base64,${logo.toString("base64")}`;
}

type OpenGraphImageProps = {
  params: Promise<{ lang: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);
  const logoSrc = await getBrandLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top right, rgba(87, 217, 255, 0.35), transparent 34%), linear-gradient(135deg, #060c22 0%, #101841 48%, #11296b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(87, 217, 255, 0.08), transparent 20%, transparent 75%, rgba(6, 12, 34, 0.6) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 56,
            right: 72,
            width: 240,
            height: 240,
            borderRadius: "9999px",
            border: "1px solid rgba(87, 217, 255, 0.28)",
            background: "rgba(87, 217, 255, 0.08)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -60,
            width: 420,
            height: 420,
            borderRadius: "9999px",
            background: "rgba(29, 78, 216, 0.32)",
            filter: "blur(16px)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "56px 64px",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <img
              src={logoSrc}
              alt=""
              width="88"
              height="88"
              style={{
                objectFit: "contain",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 20,
                  textTransform: "uppercase",
                  letterSpacing: "0.42em",
                  color: "#57d9ff",
                }}
              >
                Digital Clip Agency
              </span>
              <span
                style={{
                  fontSize: 28,
                  color: "rgba(255,255,255,0.74)",
                }}
              >
                {dictionary.hero.eyebrow}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 26,
              maxWidth: 860,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                borderRadius: "9999px",
                border: "1px solid rgba(87, 217, 255, 0.28)",
                background: "rgba(87, 217, 255, 0.1)",
                padding: "12px 20px",
                fontSize: 24,
                color: "#57d9ff",
              }}
            >
              {dictionary.agency.platforms.join(" • ")}
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <span
                style={{
                  fontSize: 72,
                  lineHeight: 1.02,
                  fontWeight: 700,
                  letterSpacing: "-0.05em",
                }}
              >
                {dictionary.hero.title}
              </span>
              <span
                style={{
                  fontSize: 31,
                  lineHeight: 1.35,
                  color: "rgba(255,255,255,0.78)",
                }}
              >
                {dictionary.metadata.description}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
