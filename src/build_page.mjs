import { spawn, execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  svgBepiColomboSpace,
  svgCop31Overtime,
  svgCycloneAkvan,
  svgHeroKyivPoland,
  svgMarketsCorrection,
  svgMexicoChapoIsidro,
  svgUkEuReset,
  svgWhoDrcEbola,
  svgYemenHodeidah,
} from "./illustrations.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const ENTRY_PNG = join(REPO_ROOT, "entry.png");
const PREVIEW_DIR = process.env.PREVIEW_DIR ? resolve(process.env.PREVIEW_DIR) : null;

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/opt/homebrew/bin/chromium",
];

function findChromeBinary() {
  for (const candidate of CHROME_CANDIDATES) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error("No local Chrome/Chromium binary found for headless rendering");
}

async function captureHtmlToPng(html, outPngPath) {
  const chromeBin = findChromeBinary();
  const tempRoot = mkdtempSync(join(tmpdir(), "makefun-render-"));
  const htmlPath = join(tempRoot, "broadsheet.html");
  const profileDir = join(tempRoot, "profile");
  mkdirSync(profileDir, { recursive: true });
  writeFileSync(htmlPath, html, "utf8");

  const proc = spawn(
    chromeBin,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--hide-scrollbars",
      "--force-color-profile=srgb",
      `--user-data-dir=${profileDir}`,
      "--remote-debugging-port=0",
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] }
  );

  try {
    const wsUrl = await new Promise((resolveWs, rejectWs) => {
      let stderrBuf = "";
      const timer = setTimeout(() => rejectWs(new Error(`Timed out waiting for DevTools WS: ${stderrBuf}`)), 10000);
      proc.stderr.on("data", (chunk) => {
        stderrBuf += chunk.toString("utf8");
        const match = stderrBuf.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) {
          clearTimeout(timer);
          resolveWs(match[1]);
        }
      });
      proc.once("exit", (code) => {
        clearTimeout(timer);
        rejectWs(new Error(`Chrome exited early (${code}): ${stderrBuf}`));
      });
    });

    const browserWs = new WebSocket(wsUrl);
    await new Promise((res, rej) => {
      browserWs.addEventListener("open", () => res(), { once: true });
      browserWs.addEventListener("error", (err) => rej(err), { once: true });
    });

    let msgId = 0;
    const pending = new Map();
    browserWs.addEventListener("message", (ev) => {
      const msg = JSON.parse(typeof ev.data === "string" ? ev.data : ev.data.toString("utf8"));
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) rej(new Error(JSON.stringify(msg.error)));
        else res(msg.result);
      }
    });

    const send = (method, params = {}, sessionId = undefined) =>
      new Promise((res, rej) => {
        const id = ++msgId;
        pending.set(id, { res, rej });
        const payload = sessionId ? { id, method, params, sessionId } : { id, method, params };
        browserWs.send(JSON.stringify(payload));
      });

    const { targetInfos } = await send("Target.getTargets");
    const pageTarget = targetInfos.find((t) => t.type === "page");
    if (!pageTarget) throw new Error("No page target found in headless Chrome");

    const { sessionId } = await send("Target.attachToTarget", {
      targetId: pageTarget.targetId,
      flatten: true,
    });

    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);
    await send(
      "Emulation.setDeviceMetricsOverride",
      {
        width: 1024,
        height: 1024,
        deviceScaleFactor: 1,
        mobile: false,
      },
      sessionId
    );

    const fileUrl = pathToFileURL(htmlPath).href;
    await send("Page.navigate", { url: fileUrl }, sessionId);
    await send(
      "Runtime.evaluate",
      {
        expression: `new Promise((resolve) => {
          const finish = () => requestAnimationFrame(() => requestAnimationFrame(resolve));
          if (document.readyState === 'complete') {
            document.fonts.ready.then(finish);
          } else {
            window.addEventListener('load', () => document.fonts.ready.then(finish), { once: true });
          }
        })`,
        awaitPromise: true,
      },
      sessionId
    );

    const { data } = await send(
      "Page.captureScreenshot",
      {
        format: "png",
        clip: { x: 0, y: 0, width: 1024, height: 1024, scale: 1 },
        captureBeyondViewport: false,
      },
      sessionId
    );

    const pngBuf = Buffer.from(data, "base64");
    writeFileSync(outPngPath, pngBuf, { mode: 0o644 });
    browserWs.close();
    return pngBuf;
  } finally {
    if (proc.exitCode === null) {
      proc.kill("SIGKILL");
      await new Promise((r) => proc.once("exit", r));
    }
    try {
      rmSync(tempRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 80 });
    } catch {
      // Ignore transient OS temp profile lock during teardown
    }
  }
}

function loadVerifiedStories() {
  const researchPath = resolve(REPO_ROOT, "..", "news-20261120-research", "stories_v2.json");
  if (existsSync(researchPath)) {
    return JSON.parse(readFileSync(researchPath, "utf8"));
  }
  return [];
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function buildBroadsheetHtml() {
  const stories = loadVerifiedStories();
  const byId = Object.fromEntries(stories.map((s) => [s.id, s]));

  const panels = [
    {
      id: "kyiv-bridges-poland-airspace",
      hero: true,
      accent: "#B91C1C",
      headline: byId["kyiv-bridges-poland-airspace"]?.headline ?? "Missiles Hit Kyiv & Poland",
      sublabel: byId["kyiv-bridges-poland-airspace"]?.sublabel ?? "110+ salvo hits 3 bridges & SE Poland",
      svg: svgHeroKyivPoland(),
    },
    {
      id: "global-ai-chip-market-correction",
      accent: "#DC2626",
      headline: byId["global-ai-chip-market-correction"]?.headline ?? "AI Chip Rout Sinks Stocks",
      sublabel: byId["global-ai-chip-market-correction"]?.sublabel ?? "S&P -3.7%, Nasdaq -5.3%, ASX -5.4% wk",
      svg: svgMarketsCorrection(),
    },
    {
      id: "cop31-antalya-fossil-fuel-overtime",
      accent: "#0F766E",
      headline: byId["cop31-antalya-fossil-fuel-overtime"]?.headline ?? "COP31 Stalls in Overtime",
      sublabel: byId["cop31-antalya-fossil-fuel-overtime"]?.sublabel ?? "Antalya bloc rejects fossil-fuel cut",
      svg: svgCop31Overtime(),
    },
    {
      id: "cyclone-akvan-odisha-landfall",
      accent: "#0369A1",
      headline: byId["cyclone-akvan-odisha-landfall"]?.headline ?? "Cyclone Akvan Hits Odisha",
      sublabel: byId["cyclone-akvan-odisha-landfall"]?.sublabel ?? "80 km/h landfall; 372,000 evacuated",
      svg: svgCycloneAkvan(),
    },
    {
      id: "uk-eu-brussels-reset-deal",
      accent: "#1D4ED8",
      headline: byId["uk-eu-brussels-reset-deal"]?.headline ?? "UK & EU Seal Reset Pact",
      sublabel: byId["uk-eu-brussels-reset-deal"]?.sublabel ?? "Carbon link, food trade & 100k visas",
      svg: svgUkEuReset(),
    },
    {
      id: "yemen-hodeidah-strikes",
      accent: "#991B1B",
      headline: byId["yemen-hodeidah-strikes"]?.headline ?? "Airstrikes Hit Hodeidah",
      sublabel: byId["yemen-hodeidah-strikes"]?.sublabel ?? "Coalition jets strike Red Sea port",
      svg: svgYemenHodeidah(),
    },
    {
      id: "who-drc-ebola-tally",
      accent: "#DC2626",
      headline: byId["who-drc-ebola-tally"]?.headline ?? "DRC Ebola Tops 11,613",
      sublabel: byId["who-drc-ebola-tally"]?.sublabel ?? "WHO logs 5,678 deaths; Sudan UN talks",
      svg: svgWhoDrcEbola(),
    },
    {
      id: "mexico-chapo-isidro-capture",
      accent: "#0284C7",
      headline: byId["mexico-chapo-isidro-capture"]?.headline ?? "Mexico Nets 'Chapo Isidro'",
      sublabel: byId["mexico-chapo-isidro-capture"]?.sublabel ?? "Sinaloa raid grabs FBI Top-10 boss",
      svg: svgMexicoChapoIsidro(),
    },
    {
      id: "bepicolombo-mercury-xray",
      accent: "#4338CA",
      headline: "BepiColombo 'First Light'",
      sublabel: "Mercury probe tests X-ray eye on Crab",
      svg: svgBepiColomboSpace(),
    },
  ];

  const renderedPanels = panels
    .map(
      (p) => `
      <article class="poster-card${p.hero ? " is-hero" : ""}" style="border-top-color:${p.accent}">
        <div class="art-box">${p.svg}</div>
        <div class="copy-box">
          <h2>${escapeHtml(p.headline)}</h2>
          <p>${escapeHtml(p.sublabel)}</p>
        </div>
      </article>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #F4EFE3;
    color: #0F172A;
    font-family: Georgia, Charter, serif;
    -webkit-font-smoothing: antialiased;
  }
  .page {
    width: 1024px;
    height: 1024px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 3px solid #0F172A;
  }

  .masthead {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    background: #FFFDF8;
    border: 2.5px solid #0F172A;
    border-bottom: 5px solid #0F172A;
  }
  .brand-stack {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .brand-title {
    font-family: Georgia, serif;
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -0.4px;
    line-height: 1;
    color: #0F172A;
    white-space: nowrap;
  }
  .brand-deck {
    font-family: "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 19px;
    font-weight: 800;
    letter-spacing: 0.45px;
    line-height: 1.05;
    color: #B91C1C;
    white-space: nowrap;
  }
  .date-banner {
    background: #A61B1B;
    color: #FFFFFF;
    padding: 10px 18px;
    border-radius: 5px;
    border: 2.5px solid #0F172A;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .date-main {
    font-family: "DIN Condensed", "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 34px;
    font-weight: 800;
    letter-spacing: 0.9px;
    line-height: 1;
    white-space: nowrap;
  }

  .poster-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    gap: 11px;
  }
  .poster-card {
    background: #FFFDF8;
    border: 2px solid #0F172A;
    border-top-width: 5px;
    border-radius: 4px;
    padding: 7px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .poster-card.is-hero {
    background: #FFFDF4;
    box-shadow: inset 0 0 0 1px #FCA5A5;
  }
  .art-box {
    width: 100%;
    height: 198px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .copy-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    padding-top: 4px;
  }
  .copy-box h2 {
    font-family: "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 26px;
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.1px;
    color: #0F172A;
    white-space: nowrap;
  }
  .copy-box p {
    font-family: "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 19.5px;
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: 0.05px;
    color: #334155;
    white-space: nowrap;
  }
</style>
</head>
<body>
  <div class="page">
    <header class="masthead">
      <div class="brand-stack">
        <div class="brand-title">THE WORLD IN ONE DAY</div>
        <div class="brand-deck">6 CONTINENTS · 9 BEATS · REPORTED 20 NOV 2026</div>
      </div>
      <div class="date-banner">
        <div class="date-main">FRIDAY, 20 NOVEMBER 2026</div>
      </div>
    </header>

    <main class="poster-grid">
      ${renderedPanels}
    </main>
  </div>
</body>
</html>`;
}

async function run() {
  const html = buildBroadsheetHtml();
  const buf = await captureHtmlToPng(html, ENTRY_PNG);
  if (PREVIEW_DIR) {
    mkdirSync(PREVIEW_DIR, { recursive: true });
    const preview1024 = join(PREVIEW_DIR, "preview-1024.png");
    const preview300 = join(PREVIEW_DIR, "preview-300.png");
    writeFileSync(preview1024, buf, { mode: 0o644 });
    execFileSync("/usr/bin/sips", ["-z", "300", "300", ENTRY_PNG, "--out", preview300], {
      stdio: "ignore",
    });
  }
  console.log(`Rendered entry.png (${buf.byteLength} bytes)`);
}

run();
