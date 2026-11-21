import { spawn, execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  svgBepiColomboSpace,
  svgCop31Overtime,
  svgCycloneAkvan,
  svgGtaViRecordSales,
  svgHeroKyivPoland,
  svgLatAmCaribbean,
  svgMarketsCorrection,
  svgMiddleEastUnReport,
  svgNigeriaBoatCapsize,
  svgUkEuReset,
  svgUsChinaMilitaryAi,
  svgWhoDrcEbola,
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
  const researchPath = resolve(REPO_ROOT, "..", "news-20261120-research", "stories.json");
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

  const gridCards = [
    {
      id: "cyclone-akvan-odisha-landfall",
      kicker: "SOUTH ASIA · WEATHER",
      accent: "#0369A1",
      headline: byId["cyclone-akvan-odisha-landfall"]?.headline_short ?? "Cyclone Akvan Lands in Odisha, India",
      fact: byId["cyclone-akvan-odisha-landfall"]?.fact_line ?? "70-80 km/h winds hit Gopalpur after 372,000 evacuated; zero deaths cited.",
      svg: svgCycloneAkvan(),
    },
    {
      id: "uk-eu-brussels-reset-deal",
      kicker: "EUROPE · TRADE & LAW",
      accent: "#1D4ED8",
      headline: byId["uk-eu-brussels-reset-deal"]?.headline_short ?? "UK & EU Seal Post-Brexit Reset Pact",
      fact: byId["uk-eu-brussels-reset-deal"]?.fact_line ?? "PM Burnham & EU link carbon markets, SPS food trade & 100k youth visas.",
      svg: svgUkEuReset(),
    },
    {
      id: "us-china-military-ai-cyber-chief",
      kicker: "N. AMERICA · AI & CYBER",
      accent: "#3730A3",
      headline: byId["us-china-military-ai-cyber-chief"]?.headline_short ?? "US & China Set Military AI Guardrails",
      fact: byId["us-china-military-ai-cyber-chief"]?.fact_line ?? "Trump briefing touts human-in-loop AI accord; US cyber chief replaced.",
      svg: svgUsChinaMilitaryAi(),
    },
    {
      id: "nigeria-bayelsa-boat-capsize",
      kicker: "WEST AFRICA · DISASTER",
      accent: "#B91C1C",
      headline: byId["nigeria-bayelsa-boat-capsize"]?.headline_short ?? "Mourners' Boat Capsizes in Nigeria",
      fact: byId["nigeria-bayelsa-boat-capsize"]?.fact_line ?? "Barge with 300+ funeral passengers sinks on Nun River; 50+ feared dead.",
      svg: svgNigeriaBoatCapsize(),
    },
    {
      id: "who-drc-ebola-pheic-sudan-unsc",
      kicker: "C. & E. AFRICA · HEALTH",
      accent: "#DC2626",
      headline: byId["who-drc-ebola-pheic-sudan-unsc"]?.headline_short ?? "WHO Keeps DRC Ebola Global Emergency",
      fact: byId["who-drc-ebola-pheic-sudan-unsc"]?.fact_line ?? "Bundibugyo cases top 11,600 in eastern DRC as UNSC meets on Sudan war.",
      svg: svgWhoDrcEbola(),
    },
    {
      id: "middle-east-un-west-bank-iran",
      kicker: "MIDDLE EAST · UN REPORT",
      accent: "#991B1B",
      headline: byId["middle-east-un-west-bank-iran"]?.headline_short ?? "UN: 400+ Attacks Hit West Bank Groves",
      fact: byId["middle-east-un-west-bank-iran"]?.fact_line ?? "OCHA cites 4,000+ olive trees ruined & Gaza floods; US rejects Iran terms.",
      svg: svgMiddleEastUnReport(),
    },
    {
      id: "ecuador-security-barbados-ai-summit",
      kicker: "LATIN AMERICA · DIPLOMACY",
      accent: "#0284C7",
      headline: byId["ecuador-security-barbados-ai-summit"]?.headline_short ?? "US-Ecuador Pact & Barbados UN AI Talks",
      fact: byId["ecuador-security-barbados-ai-summit"]?.fact_line ?? "Hegseth & Noboa meet in Quito on cartel pact; UN sets Barbados AI summit.",
      svg: svgLatAmCaribbean(),
    },
    {
      id: "bepicolombo-mercury-xray-first-light",
      kicker: "SPACE · SCIENCE",
      accent: "#4338CA",
      headline: byId["bepicolombo-mercury-xray-first-light"]?.headline_short ?? "BepiColombo Captures First X-Ray Light",
      fact: byId["bepicolombo-mercury-xray-first-light"]?.fact_line ?? "ESA/JAXA MIXS telescope images Crab Nebula on eve of Mercury arrival.",
      svg: svgBepiColomboSpace(),
    },
    {
      id: "gta-vi-record-day-one-sales",
      kicker: "GLOBAL · CULTURE & MEDIA",
      accent: "#B45309",
      headline: byId["gta-vi-record-day-one-sales"]?.headline_short ?? "GTA VI Logs Record $3.79B Day-1 Sales",
      fact: byId["gta-vi-record-day-one-sales"]?.fact_line ?? "Take-Two reports 32.5M pre-orders & 7.9M peak stream viewers worldwide.",
      svg: svgGtaViRecordSales(),
    },
  ];

  const heroStory = byId["kyiv-bridges-poland-airspace"] ?? {
    headline_short: "Missiles Hit Kyiv Bridges & SE Poland",
    fact_line: "110+ Russian missiles hit 3 Dnipro bridges; 2 Kh-101s crash in SE Poland.",
  };
  const secMarkets = byId["global-ai-chip-market-correction"] ?? {
    headline_short: "AI Chip Rout Tips S&P Into Correction",
    fact_line: "S&P -3.7% (6,910) in correction; Nasdaq -5.3%, TAIEX -6.2%, Nikkei -5.1%.",
  };
  const secCop31 = byId["cop31-antalya-fossil-fuel-overtime"] ?? {
    headline_short: "COP31 Overtime Over Fossil-Fuel Cut",
    fact_line: "Antalya plenary suspended as France, Panama & Pacific bloc reject draft.",
  };

  const renderedCards = gridCards
    .map(
      (c) => `
      <article class="story-card">
        <div class="card-art">${c.svg}</div>
        <div class="card-copy">
          <div class="kicker-pill" style="background:${c.accent}">${escapeHtml(c.kicker)}</div>
          <h3>${escapeHtml(c.headline)}</h3>
          <p>${escapeHtml(c.fact)}</p>
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
    padding: 9px 11px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 3px solid #0F172A;
  }

  /* Zone A: Masthead */
  .masthead {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    background: #FFFDF8;
    border: 2px solid #0F172A;
    border-bottom: 4px solid #0F172A;
  }
  .brand-left {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .brand-overline {
    font-family: "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 0.8px;
    color: #B91C1C;
    white-space: nowrap;
  }
  .brand-title {
    font-family: Georgia, serif;
    font-size: 27px;
    font-weight: 700;
    letter-spacing: 0.3px;
    line-height: 1.04;
    color: #0F172A;
    white-space: nowrap;
  }
  .masthead-crest {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 3px 10px;
    border-left: 1.5px solid #CBD5E1;
    border-right: 1.5px solid #CBD5E1;
    flex-shrink: 0;
  }
  .crest-meta {
    display: flex;
    flex-direction: column;
    font-family: "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    line-height: 1.15;
    white-space: nowrap;
  }
  .crest-meta b {
    font-size: 11.5px;
    font-weight: 800;
    color: #0F172A;
    letter-spacing: 0.4px;
  }
  .crest-meta span {
    font-size: 10.8px;
    font-weight: 700;
    color: #475569;
    letter-spacing: 0.3px;
  }
  .date-banner {
    background: #A61B1B;
    color: #FFFFFF;
    padding: 6px 14px;
    border-radius: 4px;
    border: 2px solid #0F172A;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .date-banner .date-main {
    font-family: "DIN Condensed", "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 29px;
    font-weight: 800;
    letter-spacing: 1px;
    line-height: 0.98;
    white-space: nowrap;
  }
  .date-banner .date-sub {
    font-family: "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #FDE68A;
    margin-top: 2px;
    white-space: nowrap;
  }

  /* Zone B: Above-the-fold Hero + 2 Secondary Features */
  .top-deck {
    height: 296px;
    display: grid;
    grid-template-columns: 560px 426px;
    gap: 8px;
  }
  .hero-card {
    background: #FFFDF8;
    border: 2px solid #0F172A;
    border-top: 5px solid #B91C1C;
    padding: 7px 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .hero-header {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .hero-kicker-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .kicker-pill {
    display: inline-block;
    color: #FFFFFF;
    font-family: "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 11.5px;
    font-weight: 800;
    letter-spacing: 0.6px;
    padding: 1.5px 7px;
    border-radius: 2.5px;
    line-height: 1.2;
    align-self: flex-start;
  }
  .hero-stamp {
    font-family: "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 12px;
    font-weight: 800;
    color: #B91C1C;
    letter-spacing: 0.5px;
  }
  .hero-card h2 {
    font-size: 25.5px;
    font-weight: 700;
    line-height: 1.08;
    color: #0F172A;
    letter-spacing: -0.2px;
  }
  .hero-card .hero-fact {
    font-family: "Avenir Next", "Helvetica Neue", sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    line-height: 1.22;
    color: #1E293B;
  }
  .hero-art {
    width: 540px;
    height: 192px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .secondary-stack {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 8px;
  }
  .sec-card {
    background: #FFFDF8;
    border: 2px solid #0F172A;
    padding: 6px 8px;
    display: grid;
    grid-template-columns: 234px 168px;
    gap: 8px;
    align-items: center;
  }
  .sec-card.markets { border-top: 4px solid #DC2626; }
  .sec-card.climate { border-top: 4px solid #0F766E; }
  .sec-copy {
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: 100%;
    justify-content: center;
  }
  .sec-copy h3 {
    font-size: 19px;
    font-weight: 700;
    line-height: 1.12;
    color: #0F172A;
  }
  .sec-copy p {
    font-family: "Avenir Next", "Helvetica Neue", sans-serif;
    font-size: 12.8px;
    font-weight: 600;
    line-height: 1.25;
    color: #334155;
  }

  /* Zone C: 3x3 Regional & Beat Illustrated Cards */
  .cards-grid {
    height: 494px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 8px;
  }
  .story-card {
    background: #FFFDF8;
    border: 1.8px solid #1E293B;
    padding: 6px 7px;
    display: grid;
    grid-template-columns: 116px 1fr;
    gap: 8px;
    align-items: center;
  }
  .card-art {
    width: 116px;
    height: 142px;
    display: flex;
  }
  .card-copy {
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: 142px;
    justify-content: flex-start;
    padding-top: 1px;
  }
  .card-copy h3 {
    font-size: 16.8px;
    font-weight: 700;
    line-height: 1.13;
    color: #0F172A;
    letter-spacing: -0.15px;
  }
  .card-copy p {
    font-family: "Avenir Next", "Helvetica Neue", sans-serif;
    font-size: 12.4px;
    font-weight: 600;
    line-height: 1.24;
    color: #334155;
  }

  /* Zone D: Markets Ribbon & World Dispatches */
  .footer-zone {
    height: 114px;
    display: flex;
    flex-direction: column;
    border: 2px solid #0F172A;
    background: #FFFDF8;
    overflow: hidden;
  }
  .ticker-bar {
    height: 36px;
    background: #0F172A;
    color: #F8FAFC;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-family: "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.3px;
  }
  .ticker-tag {
    background: #F59E0B;
    color: #0F172A;
    padding: 2px 6px;
    border-radius: 2px;
    font-size: 11.5px;
  }
  .dn { color: #FCA5A5; }
  .up { color: #86EFAC; }

  .dispatches {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }
  .dispatch-col {
    padding: 5px 8px;
    border-right: 1.5px solid #CBD5E1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .dispatch-col:last-child { border-right: none; }
  .dispatch-head {
    font-family: "Avenir Next Condensed", "Helvetica Neue", sans-serif;
    font-size: 11.5px;
    font-weight: 800;
    color: #B91C1C;
    letter-spacing: 0.5px;
  }
  .dispatch-body {
    font-family: "Avenir Next", "Helvetica Neue", sans-serif;
    font-size: 11.8px;
    font-weight: 600;
    line-height: 1.22;
    color: #1E293B;
  }
</style>
</head>
<body>
  <div class="page">
    <header class="masthead">
      <div class="brand-left">
        <div class="brand-overline">GLOBAL BROADSHEET EDITION · 6 CONTINENTS · 9 BEATS</div>
        <div class="brand-title">THE WORLD IN ONE DAY</div>
      </div>
      <div class="masthead-crest">
        <svg viewBox="0 0 42 42" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
          <circle cx="21" cy="21" r="19" fill="#0F172A" stroke="#B91C1C" stroke-width="2"/>
          <ellipse cx="21" cy="21" rx="10" ry="18.5" fill="none" stroke="#93C5FD" stroke-width="1.2"/>
          <line x1="2.5" y1="21" x2="39.5" y2="21" stroke="#93C5FD" stroke-width="1.2"/>
          <path d="M 5.5 13 Q 21 16 36.5 13 M 5.5 29 Q 21 26 36.5 29" fill="none" stroke="#93C5FD" stroke-width="1.1"/>
          <line x1="21" y1="2.5" x2="21" y2="39.5" stroke="#FDE047" stroke-width="1.3"/>
        </svg>
        <div class="crest-meta">
          <b>12 ILLUSTRATED DISPATCHES</b>
          <span>AMERICAS · EUROPE · AFRICA · ASIA</span>
        </div>
      </div>
      <div class="date-banner">
        <div class="date-main">FRIDAY, 20 NOVEMBER 2026</div>
        <div class="date-sub">REPORTED &amp; OCCURRED ON 20 NOV 2026</div>
      </div>
    </header>

    <section class="top-deck">
      <article class="hero-card">
        <div class="hero-header">
          <div class="hero-kicker-row">
            <span class="kicker-pill" style="background:#B91C1C">EUROPE · GEOPOLITICS &amp; CONFLICT</span>
            <span class="hero-stamp">LEAD DISPATCH · KYIV &amp; SE POLAND</span>
          </div>
          <h2>${escapeHtml(heroStory.headline_short)}</h2>
          <div class="hero-fact">${escapeHtml(heroStory.fact_line)} NATO scrambles fighter jets during 11-nation allied drills.</div>
        </div>
        <div class="hero-art">${svgHeroKyivPoland()}</div>
      </article>

      <div class="secondary-stack">
        <article class="sec-card markets">
          <div class="sec-copy">
            <span class="kicker-pill" style="background:#DC2626">GLOBAL ECONOMY · ASIA TO NY</span>
            <h3>${escapeHtml(secMarkets.headline_short)}</h3>
            <p>${escapeHtml(secMarkets.fact_line)}</p>
          </div>
          <div>${svgMarketsCorrection()}</div>
        </article>

        <article class="sec-card climate">
          <div class="sec-copy">
            <span class="kicker-pill" style="background:#0F766E">CLIMATE SUMMIT · ANTALYA</span>
            <h3>${escapeHtml(secCop31.headline_short)}</h3>
            <p>${escapeHtml(secCop31.fact_line)}</p>
          </div>
          <div>${svgCop31Overtime()}</div>
        </article>
      </div>
    </section>

    <section class="cards-grid">
      ${renderedCards}
    </section>

    <footer class="footer-zone">
      <div class="ticker-bar">
        <span class="ticker-tag">20 NOV CLOSES</span>
        <span>S&amp;P 500 6,910 <b class="dn">-3.7%</b></span>
        <span>NASDAQ 22,618 <b class="dn">-5.3%</b></span>
        <span>DOW 48,147 <b class="dn">-1.9%</b></span>
        <span>NIKKEI 56,437 <b class="dn">-5.1%</b></span>
        <span>KOSPI 4,870 <b class="dn">-5.2%</b></span>
        <span>ASX 200 8,593 <b class="dn">-5.4% WK</b></span>
        <span>BRENT $92.57 <b class="up">+0.6%</b></span>
      </div>
      <div class="dispatches">
        <div class="dispatch-col">
          <div class="dispatch-head">OCEANIA · SYDNEY &amp; NZ</div>
          <div class="dispatch-body">AFP charges Sydney terror suspect; NZ High Court rules pay-equity overhaul discriminatory.</div>
        </div>
        <div class="dispatch-col">
          <div class="dispatch-head">EUROPE · BRUSSELS &amp; NORDICS</div>
          <div class="dispatch-body">Hungary lifts veto on Ukraine EU clusters; Denmark expels Russian attaché over plot.</div>
        </div>
        <div class="dispatch-col">
          <div class="dispatch-head">EAST ASIA · SEOUL</div>
          <div class="dispatch-body">South Korea's ruling DPK adopts motion to impeach Supreme Court Chief Justice Cho.</div>
        </div>
        <div class="dispatch-col">
          <div class="dispatch-head">AFRICA &amp; UN · WORLD</div>
          <div class="dispatch-body">South Africa mourns ex-VP Mlambo-Ngcuka (71); UN marks World Children's Day (UNICEF 80).</div>
        </div>
      </div>
    </footer>
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
