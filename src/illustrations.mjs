export function svgHeroKyivPoland() {
  return `<svg viewBox="0 0 544 192" width="544" height="192" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kyivBg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#102033"/>
        <stop offset="100%" stop-color="#172C46"/>
      </linearGradient>
      <linearGradient id="radarBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0B1E24"/>
        <stop offset="100%" stop-color="#122B33"/>
      </linearGradient>
      <radialGradient id="blastGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="45%" stop-color="#F97316"/>
        <stop offset="100%" stop-color="#DC2626" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- Left Panel: Kyiv Dnipro Bridges -->
    <rect x="0" y="0" width="268" height="192" rx="5" fill="url(#kyivBg)"/>
    <!-- Subtle Kyiv urban street grid -->
    <g stroke="#243B55" stroke-width="1" opacity="0.65">
      <line x1="18" y1="28" x2="96" y2="48"/>
      <line x1="12" y1="70" x2="104" y2="76"/>
      <line x1="20" y1="112" x2="112" y2="108"/>
      <line x1="30" y1="152" x2="122" y2="144"/>
      <line x1="56" y1="16" x2="48" y2="176"/>
      <line x1="88" y1="18" x2="96" y2="176"/>
      <line x1="162" y1="42" x2="252" y2="34"/>
      <line x1="166" y1="92" x2="256" y2="98"/>
      <line x1="172" y1="138" x2="254" y2="148"/>
      <line x1="204" y1="22" x2="216" y2="176"/>
    </g>

    <!-- Dnipro River winding N->S through Kyiv -->
    <path d="M 118 0 C 122 36, 108 58, 126 88 C 142 114, 134 146, 152 192 L 184 192 C 166 146, 174 112, 156 84 C 140 56, 152 34, 148 0 Z"
          fill="#1D5B8C" stroke="#56B4E9" stroke-width="1.4"/>
    <!-- River island (Trukhaniv) -->
    <path d="M 134 40 C 141 52, 142 68, 137 78 C 131 70, 130 54, 134 40 Z" fill="#2A4B3C" opacity="0.85"/>

    <!-- 3 Targeted Bridges across Dnipro -->
    <g stroke="#E2E8F0" stroke-width="4.5" stroke-linecap="round">
      <line x1="104" y1="48" x2="162" y2="44"/>
      <line x1="114" y1="98" x2="174" y2="94"/>
      <line x1="126" y1="146" x2="186" y2="142"/>
    </g>

    <!-- Smoke plumes -->
    <g fill="#0F172A" opacity="0.65">
      <path d="M 134 44 C 130 28, 144 18, 156 12 C 164 20, 152 32, 142 44 Z"/>
      <path d="M 146 94 C 144 76, 158 66, 170 60 C 176 70, 162 82, 154 94 Z"/>
      <path d="M 156 143 C 154 125, 168 116, 180 110 C 186 120, 172 132, 164 143 Z"/>
    </g>

    <!-- Explosion starbursts on 3 bridges -->
    <circle cx="133" cy="46" r="15" fill="url(#blastGlow)"/>
    <polygon points="133,35 136,42 144,41 138,46 143,53 135,50 132,57 130,49 122,51 128,45 124,39 131,42" fill="#FEF08A" stroke="#DC2626" stroke-width="1"/>

    <circle cx="145" cy="96" r="15" fill="url(#blastGlow)"/>
    <polygon points="145,85 148,92 156,91 150,96 155,103 147,100 144,107 142,99 134,101 140,95 136,89 143,92" fill="#FEF08A" stroke="#DC2626" stroke-width="1"/>

    <circle cx="156" cy="144" r="15" fill="url(#blastGlow)"/>
    <polygon points="156,133 159,140 167,139 161,144 166,151 158,148 155,155 153,147 145,149 151,143 147,137 154,140" fill="#FEF08A" stroke="#DC2626" stroke-width="1"/>

    <!-- Kyiv Bridge Labels -->
    <rect x="8" y="8" width="118" height="19" rx="3" fill="#0B1320" opacity="0.9"/>
    <text x="14" y="21" fill="#F8FAFC" font-family="Avenir Next Condensed, Helvetica Neue, sans-serif" font-size="12" font-weight="800" letter-spacing="0.6">KYIV · DNIPRO RIVER</text>

    <rect x="10" y="38" width="84" height="16" rx="2" fill="#7F1D1D"/>
    <text x="15" y="50" fill="#FEF2F2" font-family="Avenir Next Condensed, sans-serif" font-size="11" font-weight="700">PODILSKO BR.</text>

    <rect x="14" y="88" width="90" height="16" rx="2" fill="#7F1D1D"/>
    <text x="19" y="100" fill="#FEF2F2" font-family="Avenir Next Condensed, sans-serif" font-size="11" font-weight="700">DARNYTSKYI BR.</text>

    <rect x="24" y="136" width="88" height="16" rx="2" fill="#7F1D1D"/>
    <text x="29" y="148" fill="#FEF2F2" font-family="Avenir Next Condensed, sans-serif" font-size="11" font-weight="700">PIVDENNYI BR.</text>

    <!-- Kyiv East Bank label & air-defense interceptor arc -->
    <text x="192" y="24" fill="#94A3B8" font-family="Avenir Next Condensed, sans-serif" font-size="11" font-weight="800" letter-spacing="0.6">EAST BANK</text>
    <path d="M 244 168 Q 214 108 172 95" fill="none" stroke="#38BDF8" stroke-width="1.6" stroke-dasharray="3,3"/>
    <text x="196" y="176" fill="#7DD3FC" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="700">AIR DEFENSE</text>

    <rect x="8" y="166" width="152" height="20" rx="3" fill="#DC2626"/>
    <text x="84" y="180" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="11.5" font-weight="800">3 BRIDGES HIT · 110+ SALVO</text>

    <!-- Center Divider -->
    <line x1="270" y1="4" x2="270" y2="188" stroke="#F6F1E6" stroke-width="2.5"/>

    <!-- Right Panel: SE Poland Border & NATO Air Defense Radar -->
    <rect x="272" y="0" width="272" height="192" rx="5" fill="url(#radarBg)"/>
    <!-- Radar Concentric Rings -->
    <g fill="none" stroke="#2DD4BF" stroke-opacity="0.24" stroke-width="1">
      <circle cx="388" cy="102" r="34"/>
      <circle cx="388" cy="102" r="66"/>
      <circle cx="388" cy="102" r="98"/>
      <line x1="286" y1="102" x2="534" y2="102"/>
      <line x1="388" y1="10" x2="388" y2="186"/>
    </g>
    <!-- Radar sweep wedge -->
    <path d="M 388 102 L 456 36 A 96 96 0 0 1 482 88 Z" fill="#2DD4BF" opacity="0.14"/>

    <!-- Poland / Ukraine Border Line -->
    <path d="M 406 8 L 396 46 L 414 88 L 402 134 L 418 188" fill="none" stroke="#FBBF24" stroke-width="2.4" stroke-dasharray="6,4"/>
    <text x="284" y="44" fill="#A7F3D0" font-family="Avenir Next Condensed, sans-serif" font-size="13" font-weight="800" letter-spacing="0.8">SE POLAND</text>
    <text x="466" y="44" fill="#94A3B8" font-family="Avenir Next Condensed, sans-serif" font-size="13" font-weight="800" letter-spacing="0.8">W. UKRAINE</text>
    <text x="415" y="156" fill="#FDE68A" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="700">NATO BORDER</text>

    <!-- 2 Kh-101 Missile Arcs crossing into SE Poland -->
    <path d="M 534 62 Q 452 48 358 84" fill="none" stroke="#FB7185" stroke-width="2.6" stroke-dasharray="5,3"/>
    <path d="M 534 114 Q 456 102 368 126" fill="none" stroke="#FB7185" stroke-width="2.6" stroke-dasharray="5,3"/>
    <!-- Impact markers in SE Poland -->
    <circle cx="356" cy="85" r="7" fill="#EF4444" stroke="#FEF08A" stroke-width="1.8"/>
    <circle cx="366" cy="127" r="7" fill="#EF4444" stroke="#FEF08A" stroke-width="1.8"/>
    <rect x="424" y="64" width="108" height="16" rx="2.5" fill="#4C0519" opacity="0.92"/>
    <text x="478" y="75.5" text-anchor="middle" fill="#FECDD3" font-family="Avenir Next Condensed, sans-serif" font-size="11" font-weight="800">2× Kh-101 + DRONE</text>

    <!-- 2 Scrambled NATO Fighter Silhouettes (right-facing intercept vectors) -->
    <path d="M 336 69 L 316 61 L 320 67 L 308 68 L 305 64 L 305 74 L 308 70 L 320 71 L 316 77 Z" fill="#F8FAFC" stroke="#38BDF8" stroke-width="0.7"/>
    <path d="M 342 119 L 322 111 L 326 117 L 314 118 L 311 114 L 311 124 L 314 120 L 326 121 L 322 127 Z" fill="#F8FAFC" stroke="#38BDF8" stroke-width="0.7"/>
    <text x="282" y="99" fill="#7DD3FC" font-family="Avenir Next Condensed, sans-serif" font-size="11" font-weight="800">NATO JETS</text>

    <rect x="280" y="8" width="116" height="19" rx="3" fill="#0B1320" opacity="0.9"/>
    <text x="286" y="21" fill="#F8FAFC" font-family="Avenir Next Condensed, sans-serif" font-size="12" font-weight="800" letter-spacing="0.5">POLISH AIRSPACE</text>

    <rect x="364" y="166" width="172" height="20" rx="3" fill="#B91C1C"/>
    <text x="372" y="180" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="12" font-weight="800">2 MISSILES CRASH IN POLAND</text>
  </svg>`;
}

export function svgMarketsCorrection() {
  return `<svg viewBox="0 0 166 128" width="166" height="128" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="166" height="128" rx="5" fill="#111827"/>
    <!-- Grid lines -->
    <line x1="8" y1="26" x2="158" y2="26" stroke="#475569" stroke-width="1.2"/>
    <line x1="8" y1="58" x2="158" y2="58" stroke="#1E293B" stroke-width="1"/>
    <line x1="8" y1="90" x2="158" y2="90" stroke="#1E293B" stroke-width="1"/>

    <!-- 5 Proportional 1-Day Waterfall Bars from baseline y=26 -->
    <g font-family="Avenir Next Condensed, sans-serif" font-weight="800" font-size="9.8" text-anchor="middle">
      <!-- TAIEX -6.2% -->
      <rect x="10" y="26" width="22" height="64" rx="2" fill="#EF4444"/>
      <text x="21" y="105" fill="#FCA5A5">-6.2%</text>
      <text x="21" y="119" fill="#E2E8F0">TAIEX</text>

      <!-- NASDAQ -5.3% -->
      <rect x="40" y="26" width="22" height="55" rx="2" fill="#DC2626"/>
      <text x="51" y="105" fill="#FCA5A5">-5.3%</text>
      <text x="51" y="119" fill="#E2E8F0">NASD</text>

      <!-- KOSPI -5.2% -->
      <rect x="71" y="26" width="22" height="54" rx="2" fill="#DC2626"/>
      <text x="82" y="105" fill="#FCA5A5">-5.2%</text>
      <text x="82" y="119" fill="#E2E8F0">KOSPI</text>

      <!-- NIKKEI -5.1% -->
      <rect x="102" y="26" width="22" height="53" rx="2" fill="#B91C1C"/>
      <text x="113" y="105" fill="#FCA5A5">-5.1%</text>
      <text x="113" y="119" fill="#E2E8F0">NIKK</text>

      <!-- S&P -3.7% -->
      <rect x="133" y="26" width="23" height="38" rx="2" fill="#F97316"/>
      <text x="144.5" y="105" fill="#FDBA74">-3.7%</text>
      <text x="144.5" y="119" fill="#FFFBEB">S&amp;P</text>
    </g>

    <!-- Callout pill pointing to S&P entering >-10% peak correction -->
    <line x1="144.5" y1="64" x2="144.5" y2="73" stroke="#FDE047" stroke-width="1.5"/>
    <rect x="64" y="73" width="94" height="15" rx="2.5" fill="#0F172A" stroke="#FBBF24" stroke-width="1.1"/>
    <text x="111" y="83.5" text-anchor="middle" fill="#FEF08A" font-family="Avenir Next Condensed, sans-serif" font-size="9.2" font-weight="800">S&amp;P &gt;10% OFF PEAK</text>

    <!-- AI Chip Badge at top -->
    <rect x="8" y="5" width="150" height="17" rx="3" fill="#7F1D1D"/>
    <rect x="13" y="8" width="11" height="11" rx="1.5" fill="none" stroke="#FDE047" stroke-width="1.4"/>
    <rect x="16" y="11" width="5" height="5" fill="#FDE047"/>
    <text x="90" y="17.5" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">AI CHIP ROUT · S&amp;P 6,910</text>
  </svg>`;
}

export function svgCop31Overtime() {
  return `<svg viewBox="0 0 166 128" width="166" height="128" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="166" height="128" rx="5" fill="#0F292E"/>
    <!-- Draft Treaty Sheet -->
    <rect x="10" y="10" width="90" height="92" rx="4" fill="#FFFDF7" stroke="#94A3B8" stroke-width="1.2"/>
    <rect x="10" y="10" width="90" height="18" rx="3" fill="#0F766E"/>
    <text x="55" y="22.5" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">COP31 DRAFT</text>

    <g font-family="Avenir Next Condensed, sans-serif" font-weight="800" font-size="12.5" fill="#1E293B">
      <text x="18" y="45">COAL</text>
      <text x="18" y="65">OIL</text>
      <text x="18" y="85">GAS</text>
    </g>
    <!-- Bold Red Strikethroughs showing fossil-fuel language cut -->
    <g stroke="#DC2626" stroke-width="2.8" stroke-linecap="round">
      <line x1="15" y1="41" x2="88" y2="41"/>
      <line x1="15" y1="61" x2="88" y2="61"/>
      <line x1="15" y1="81" x2="88" y2="81"/>
      <line x1="66" y1="34" x2="88" y2="88"/>
      <line x1="88" y1="34" x2="66" y2="88"/>
    </g>
    <text x="55" y="97" text-anchor="middle" fill="#B91C1C" font-family="Avenir Next Condensed, sans-serif" font-size="9.5" font-weight="800">PHASE-OUT CUT</text>

    <!-- Overtime Midnight Clock -->
    <circle cx="132" cy="40" r="24" fill="#134E4A" stroke="#FBBF24" stroke-width="2.4"/>
    <circle cx="132" cy="40" r="2" fill="#FEF08A"/>
    <line x1="132" y1="40" x2="132" y2="22" stroke="#FEF08A" stroke-width="2.4" stroke-linecap="round"/>
    <line x1="132" y1="40" x2="145" y2="33" stroke="#FB7185" stroke-width="2.4" stroke-linecap="round"/>
    <text x="132" y="13" text-anchor="middle" fill="#FDE68A" font-family="Avenir Next Condensed, sans-serif" font-size="10" font-weight="800">00:45+</text>

    <!-- Suspended Plenary Gavel -->
    <g transform="translate(114,72) rotate(-24)">
      <rect x="0" y="6" width="24" height="11" rx="2" fill="#D97706" stroke="#FEF3C7" stroke-width="1"/>
      <rect x="10" y="17" width="4" height="20" rx="1" fill="#F59E0B"/>
    </g>
    <rect x="114" y="96" width="38" height="6" rx="2" fill="#B45309"/>

    <!-- Bottom Pill -->
    <rect x="8" y="106" width="150" height="17" rx="3" fill="#115E59"/>
    <text x="83" y="118" text-anchor="middle" fill="#ECFDF5" font-family="Avenir Next Condensed, sans-serif" font-size="11" font-weight="800">ANTALYA PLENARY SUSPENDED</text>
  </svg>`;
}

export function svgCycloneAkvan() {
  return `<svg viewBox="0 0 116 142" width="116" height="142" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="116" height="142" rx="5" fill="#0B3B52"/>
    <!-- India Eastern Coastline (Andhra -> Odisha -> Bengal) -->
    <path d="M 0 0 L 78 0 L 70 22 L 54 44 L 44 68 L 30 96 L 18 122 L 0 122 Z" fill="#DFD6BE" stroke="#94A3B8" stroke-width="1.2"/>
    <text x="8" y="42" fill="#1E293B" font-family="Avenir Next Condensed, sans-serif" font-size="11.5" font-weight="800">ODISHA</text>
    <text x="64" y="108" fill="#7DD3FC" font-family="Avenir Next Condensed, sans-serif" font-size="10" font-weight="700">BAY OF</text>
    <text x="62" y="118" fill="#7DD3FC" font-family="Avenir Next Condensed, sans-serif" font-size="10" font-weight="700">BENGAL</text>

    <!-- Storm Track Arrow from SE to Gopalpur -->
    <path d="M 102 102 Q 82 82 54 64" fill="none" stroke="#FDE047" stroke-width="2.4" stroke-dasharray="4,3"/>

    <!-- Spiral Cyclone Vortex at Gopalpur -->
    <g transform="translate(56,64)">
      <circle cx="0" cy="0" r="24" fill="#38BDF8" opacity="0.22"/>
      <path d="M -4 -20 C 14 -22, 24 -6, 16 12 C 10 22, -8 24, -18 14" fill="none" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M 4 20 C -14 22, -24 6, -16 -12 C -10 -22, 8 -24, 18 -14" fill="none" stroke="#BAE6FD" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="6" fill="#EF4444" stroke="#FEF08A" stroke-width="2"/>
    </g>
    <rect x="4" y="6" width="76" height="16" rx="2.5" fill="#0F172A" opacity="0.88"/>
    <text x="9" y="17.5" fill="#FDE047" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">GOPALPUR · 80 KM/H</text>

    <rect x="5" y="121" width="106" height="17" rx="3" fill="#047857"/>
    <text x="58" y="133" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">372K EVAC · 0 DEATHS</text>
  </svg>`;
}

export function svgUkEuReset() {
  return `<svg viewBox="0 0 116 142" width="116" height="142" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="116" height="142" rx="5" fill="#14244B"/>
    <!-- Channel Bridge Arch -->
    <path d="M 16 54 Q 58 26 100 54" fill="none" stroke="#FBBF24" stroke-width="3"/>
    <line x1="22" y1="54" x2="94" y2="54" stroke="#FDE68A" stroke-width="2"/>

    <!-- UK Badge (Left) -->
    <g transform="translate(28,44)">
      <circle cx="0" cy="0" r="18" fill="#1D4ED8" stroke="#FFFFFF" stroke-width="2"/>
      <line x1="-16" y1="-10" x2="16" y2="10" stroke="#FFFFFF" stroke-width="4"/>
      <line x1="-16" y1="10" x2="16" y2="-10" stroke="#FFFFFF" stroke-width="4"/>
      <line x1="-17" y1="0" x2="17" y2="0" stroke="#FFFFFF" stroke-width="6"/>
      <line x1="0" y1="-17" x2="0" y2="17" stroke="#FFFFFF" stroke-width="6"/>
      <line x1="-17" y1="0" x2="17" y2="0" stroke="#DC2626" stroke-width="3.2"/>
      <line x1="0" y1="-17" x2="0" y2="17" stroke="#DC2626" stroke-width="3.2"/>
    </g>

    <!-- EU Badge (Right) -->
    <g transform="translate(88,44)">
      <circle cx="0" cy="0" r="18" fill="#1E3A8A" stroke="#FBBF24" stroke-width="2"/>
      <circle cx="0" cy="-11" r="2" fill="#FACC15"/>
      <circle cx="8" cy="-8" r="2" fill="#FACC15"/>
      <circle cx="11" cy="0" r="2" fill="#FACC15"/>
      <circle cx="8" cy="8" r="2" fill="#FACC15"/>
      <circle cx="0" cy="11" r="2" fill="#FACC15"/>
      <circle cx="-8" cy="8" r="2" fill="#FACC15"/>
      <circle cx="-11" cy="0" r="2" fill="#FACC15"/>
      <circle cx="-8" cy="-8" r="2" fill="#FACC15"/>
    </g>

    <!-- Three Pact Pillar Pills -->
    <rect x="8" y="70" width="100" height="18" rx="3" fill="#1E40AF"/>
    <text x="58" y="82.5" text-anchor="middle" fill="#E0F2FE" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">ETS + FOOD TRADE</text>

    <rect x="8" y="93" width="100" height="18" rx="3" fill="#1D4ED8"/>
    <text x="58" y="105.5" text-anchor="middle" fill="#FEF9C3" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">100K YOUTH VISAS</text>

    <rect x="5" y="121" width="106" height="17" rx="3" fill="#D97706"/>
    <text x="58" y="133" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">+£17B/YR RESET</text>
  </svg>`;
}

export function svgUsChinaMilitaryAi() {
  return `<svg viewBox="0 0 116 142" width="116" height="142" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="116" height="142" rx="5" fill="#161F33"/>
    <!-- US Mini Flag -->
    <rect x="10" y="10" width="34" height="20" rx="2" fill="#B91C1C" stroke="#E2E8F0" stroke-width="1"/>
    <line x1="10" y1="15" x2="44" y2="15" stroke="#FFFFFF" stroke-width="2.2"/>
    <line x1="10" y1="21" x2="44" y2="21" stroke="#FFFFFF" stroke-width="2.2"/>
    <line x1="10" y1="27" x2="44" y2="27" stroke="#FFFFFF" stroke-width="2.2"/>
    <rect x="10" y="10" width="16" height="11" fill="#1E3A8A"/>

    <!-- China Mini Flag -->
    <rect x="72" y="10" width="34" height="20" rx="2" fill="#DC2626" stroke="#E2E8F0" stroke-width="1"/>
    <polygon points="80,14 81.5,18 85.5,18 82,20.5 83.5,24.5 80,22 76.5,24.5 78,20.5 74.5,18 78.5,18" fill="#FACC15"/>

    <!-- Circuit Lines to Central Human-in-the-Loop Lock -->
    <g stroke="#38BDF8" stroke-width="2">
      <line x1="44" y1="20" x2="58" y2="38"/>
      <line x1="72" y1="20" x2="58" y2="38"/>
      <line x1="20" y1="68" x2="36" y2="68"/>
      <line x1="80" y1="68" x2="96" y2="68"/>
    </g>

    <!-- Central AI Safety Shield / Padlock -->
    <path d="M 44 50 A 14 14 0 0 1 72 50 L 72 58 L 44 58 Z" fill="none" stroke="#FBBF24" stroke-width="3.2"/>
    <rect x="36" y="56" width="44" height="36" rx="5" fill="#0284C7" stroke="#BAE6FD" stroke-width="1.6"/>
    <!-- Human Hand / Stop Palm Icon inside Lock -->
    <path d="M 52 84 L 52 70 M 56 84 L 56 66 M 60 84 L 60 67 M 64 84 L 64 71 M 48 77 L 52 84 L 64 84" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" fill="none"/>

    <text x="58" y="109" text-anchor="middle" fill="#BAE6FD" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">HUMAN-IN-LOOP AI</text>

    <rect x="5" y="121" width="106" height="17" rx="3" fill="#B45309"/>
    <text x="58" y="133" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">US CYBER CHIEF OUT</text>
  </svg>`;
}

export function svgNigeriaBoatCapsize() {
  return `<svg viewBox="0 0 116 142" width="116" height="142" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="116" height="142" rx="5" fill="#10384A"/>
    <!-- Lush Niger Delta Riverbanks -->
    <path d="M 0 0 L 38 0 Q 26 42 12 72 L 0 72 Z" fill="#23533A"/>
    <path d="M 82 0 L 116 0 L 116 86 Q 94 54 82 0 Z" fill="#23533A"/>
    <text x="8" y="17" fill="#A7F3D0" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">BAYELSA · NUN R.</text>

    <!-- River current ripples -->
    <ellipse cx="58" cy="78" rx="40" ry="12" fill="none" stroke="#7DD3FC" stroke-width="1.5" stroke-dasharray="5,3"/>
    <ellipse cx="58" cy="78" rx="26" ry="7" fill="none" stroke="#E0F2FE" stroke-width="1.5"/>

    <!-- Capsized Wooden Passenger Barge -->
    <g transform="translate(56,68) rotate(-26)">
      <path d="M -32 0 L 30 0 L 22 14 L -24 14 Z" fill="#92400E" stroke="#FDE68A" stroke-width="1.4"/>
      <rect x="-18" y="-8" width="32" height="8" rx="1.5" fill="#B45309"/>
    </g>
    <!-- Water line masking half hull -->
    <path d="M 10 80 Q 34 74 58 80 T 106 80 L 106 96 L 10 96 Z" fill="#10384A" opacity="0.82"/>
    <path d="M 14 80 Q 36 75 58 80 T 102 80" fill="none" stroke="#BAE6FD" stroke-width="2"/>

    <!-- Rescue Lifebuoy & Rescue Craft -->
    <circle cx="28" cy="102" r="9" fill="none" stroke="#FFFFFF" stroke-width="4"/>
    <circle cx="28" cy="102" r="9" fill="none" stroke="#EF4444" stroke-width="4" stroke-dasharray="6,6"/>
    <polygon points="74,104 98,98 102,106 78,110" fill="#FACC15" stroke="#0F172A" stroke-width="1"/>

    <rect x="5" y="121" width="106" height="17" rx="3" fill="#B91C1C"/>
    <text x="58" y="133" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="10.8" font-weight="800">300+ ABOARD BARGE</text>
  </svg>`;
}

export function svgWhoDrcEbola() {
  return `<svg viewBox="0 0 116 142" width="116" height="142" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="116" height="142" rx="5" fill="#182232"/>
    <!-- Central & East Africa Landmass (DRC + Sudan + Great Lakes) -->
    <path d="M 16 24 L 88 24 L 104 42 L 96 80 L 86 115 L 22 115 L 18 78 L 10 52 Z" fill="#DDD4BE" stroke="#64748B" stroke-width="1.2"/>
    <!-- DRC / Sudan Regional Divider -->
    <path d="M 16 56 L 66 56 L 78 68 L 74 113" fill="none" stroke="#64748B" stroke-width="1.2" stroke-dasharray="3,2"/>
    <text x="20" y="109" fill="#1E293B" font-family="Avenir Next Condensed, sans-serif" font-size="10.2" font-weight="800">DR CONGO</text>
    <text x="28" y="44" fill="#334155" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">SUDAN</text>

    <!-- UNSC Sudan Alert Pin -->
    <polygon points="83,28 92,37 83,46 74,37" fill="#D97706" stroke="#FFFFFF" stroke-width="1.3"/>
    <text x="83" y="40.5" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="8.5" font-weight="800">UN</text>

    <!-- Eastern DRC Outbreak Containment Ring & WHO Medical Cross -->
    <circle cx="72" cy="79" r="18" fill="#EF4444" opacity="0.24"/>
    <circle cx="72" cy="79" r="18" fill="none" stroke="#DC2626" stroke-width="2" stroke-dasharray="4,3"/>
    <circle cx="72" cy="79" r="11" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.6"/>
    <rect x="69.5" y="72.5" width="5" height="13" fill="#FFFFFF"/>
    <rect x="65.5" y="76.5" width="13" height="5" fill="#FFFFFF"/>

    <rect x="6" y="5" width="66" height="15" rx="2.5" fill="#0284C7"/>
    <text x="39" y="15.8" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="9.5" font-weight="800">WHO 20 NOV</text>

    <rect x="4" y="121" width="108" height="17" rx="3" fill="#DC2626"/>
    <text x="58" y="133" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="9.2" font-weight="800">11,613 CASES · 5,678 DEAD</text>
  </svg>`;
}

export function svgMiddleEastUnReport() {
  return `<svg viewBox="0 0 116 142" width="116" height="142" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="116" height="142" rx="5" fill="#1F242D"/>
    <!-- Broken Olive Branch (West Bank Harvest Report) -->
    <rect x="6" y="6" width="104" height="16" rx="2.5" fill="#334155"/>
    <text x="58" y="17" text-anchor="middle" fill="#F8FAFC" font-family="Avenir Next Condensed, sans-serif" font-size="10" font-weight="800">WEST BANK &amp; GAZA</text>

    <path d="M 14 52 Q 34 38 52 42" fill="none" stroke="#84CC16" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M 62 46 Q 82 52 100 40" fill="none" stroke="#84CC16" stroke-width="3.2" stroke-linecap="round"/>
    <!-- Olive leaves -->
    <ellipse cx="26" cy="38" rx="7" ry="3.5" transform="rotate(-25 26 38)" fill="#A3E635"/>
    <ellipse cx="40" cy="34" rx="7" ry="3.5" transform="rotate(-15 40 34)" fill="#A3E635"/>
    <ellipse cx="76" cy="42" rx="7" ry="3.5" transform="rotate(20 76 42)" fill="#A3E635"/>
    <ellipse cx="92" cy="36" rx="7" ry="3.5" transform="rotate(-20 92 36)" fill="#A3E635"/>
    <!-- Red fracture slash -->
    <line x1="53" y1="30" x2="61" y2="56" stroke="#EF4444" stroke-width="3.2" stroke-linecap="round"/>
    <text x="58" y="67" text-anchor="middle" fill="#FCA5A5" font-family="Avenir Next Condensed, sans-serif" font-size="10.2" font-weight="800">4,000+ OLIVE TREES</text>

    <!-- Bottom Left: Flooded Gaza Tent -->
    <polygon points="14,102 30,80 46,102" fill="#E2E8F0" stroke="#64748B" stroke-width="1"/>
    <path d="M 8 103 Q 22 99 34 103 T 56 103" fill="none" stroke="#38BDF8" stroke-width="2.4"/>
    <line x1="18" y1="74" x2="15" y2="81" stroke="#7DD3FC" stroke-width="1.5"/>
    <line x1="38" y1="74" x2="35" y2="81" stroke="#7DD3FC" stroke-width="1.5"/>
    <text x="30" y="114" text-anchor="middle" fill="#BAE6FD" font-family="Avenir Next Condensed, sans-serif" font-size="9" font-weight="800">GAZA RAIN</text>

    <!-- Bottom Right: Blocked Iran Deal -->
    <rect x="60" y="80" width="48" height="32" rx="3" fill="#3B181E" stroke="#EF4444" stroke-width="1.2"/>
    <text x="84" y="93.5" text-anchor="middle" fill="#FECDD3" font-family="Avenir Next Condensed, sans-serif" font-size="9.2" font-weight="800">IRAN TERMS</text>
    <text x="84" y="106" text-anchor="middle" fill="#F87171" font-family="Avenir Next Condensed, sans-serif" font-size="9.5" font-weight="800">REJECTED</text>

    <rect x="5" y="121" width="106" height="17" rx="3" fill="#991B1B"/>
    <text x="58" y="133" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">400+ GROVE ATTACKS</text>
  </svg>`;
}

export function svgLatAmCaribbean() {
  return `<svg viewBox="0 0 116 142" width="116" height="142" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="116" height="142" rx="5" fill="#0E3047"/>
    <!-- Mexico (NW Sinaloa down to Yucatan) & Central America Isthmus (Honduras) -->
    <path d="M 6 24 L 44 24 L 54 44 L 68 62 L 82 58 L 86 70 L 98 84 L 90 104 L 70 96 L 52 78 L 32 66 L 16 48 Z" fill="#D8D1BD" stroke="#64748B" stroke-width="1.2"/>
    <!-- Baja Peninsula -->
    <path d="M 8 28 L 16 54 L 11 56 L 4 30 Z" fill="#D8D1BD" stroke="#64748B" stroke-width="1"/>

    <!-- Security & Cyber Cooperation Arc -->
    <path d="M 32 46 Q 68 42 84 86" fill="none" stroke="#38BDF8" stroke-width="2.2" stroke-dasharray="4,3"/>

    <!-- Sinaloa Federal Raid Shield (NW Mexico) -->
    <path d="M 18 34 L 46 34 L 46 49 Q 32 60 18 49 Z" fill="#B91C1C" stroke="#FDE047" stroke-width="1.7"/>
    <text x="32" y="45.5" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="9" font-weight="800">SINALOA</text>
    <text x="64" y="20" text-anchor="middle" fill="#FDE68A" font-family="Avenir Next Condensed, sans-serif" font-size="9.5" font-weight="800">TOP-10 BOSS HELD</text>

    <!-- Honduras US Cyber Pact Node -->
    <circle cx="84" cy="88" r="12.5" fill="#0284C7" stroke="#BAE6FD" stroke-width="1.6"/>
    <text x="84" y="91.5" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="9" font-weight="800">CYBER</text>
    <text x="44" y="108" text-anchor="middle" fill="#BAE6FD" font-family="Avenir Next Condensed, sans-serif" font-size="9.5" font-weight="800">HONDURAS PACT</text>

    <rect x="5" y="121" width="106" height="17" rx="3" fill="#0369A1"/>
    <text x="58" y="133" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="10.2" font-weight="800">SINALOA &amp; HONDURAS</text>
  </svg>`;
}

export function svgBepiColomboSpace() {
  return `<svg viewBox="0 0 116 142" width="116" height="142" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="116" height="142" rx="5" fill="#0B1026"/>
    <!-- Stars -->
    <circle cx="14" cy="36" r="1.2" fill="#FFFFFF"/>
    <circle cx="32" cy="44" r="1" fill="#E2E8F0"/>
    <circle cx="102" cy="76" r="1.2" fill="#FFFFFF"/>
    <circle cx="92" cy="106" r="1" fill="#BAE6FD"/>

    <!-- Crab Nebula X-Ray Source (Top Right) -->
    <ellipse cx="88" cy="26" rx="18" ry="12" transform="rotate(-18 88 26)" fill="#C026D3" opacity="0.48"/>
    <ellipse cx="88" cy="26" rx="10" ry="6.5" transform="rotate(-18 88 26)" fill="#38BDF8" opacity="0.85"/>
    <circle cx="88" cy="26" r="3" fill="#FFFFFF"/>
    <text x="40" y="18" text-anchor="middle" fill="#F5D0FE" font-family="Avenir Next Condensed, sans-serif" font-size="9.5" font-weight="800">CRAB NEBULA</text>
    <line x1="65" y1="16" x2="74" y2="21" stroke="#F5D0FE" stroke-width="1"/>

    <!-- X-Ray Spectrometer Observation Cone -->
    <polygon points="56,74 75,19 99,34" fill="#38BDF8" opacity="0.22"/>
    <line x1="56" y1="74" x2="88" y2="26" stroke="#67E8F9" stroke-width="1.8" stroke-dasharray="3,2"/>

    <!-- Sunlit Mercury Crescent (Bottom Left) -->
    <circle cx="22" cy="99" r="17" fill="#475569"/>
    <path d="M 22 82 A 17 17 0 0 1 22 116 A 11 17 0 0 0 22 82 Z" fill="#FDBA74"/>
    <text x="23" y="77" text-anchor="middle" fill="#FED7AA" font-family="Avenir Next Condensed, sans-serif" font-size="9.5" font-weight="800">MERCURY</text>

    <!-- ESA/JAXA BepiColombo Probe -->
    <g transform="translate(56,76) rotate(-24)">
      <rect x="-22" y="-3.5" width="15" height="7" rx="1" fill="#2563EB" stroke="#93C5FD" stroke-width="1"/>
      <rect x="7" y="-3.5" width="15" height="7" rx="1" fill="#2563EB" stroke="#93C5FD" stroke-width="1"/>
      <rect x="-6.5" y="-6.5" width="13" height="13" rx="2" fill="#F59E0B" stroke="#FEF3C7" stroke-width="1.2"/>
    </g>

    <rect x="5" y="121" width="106" height="17" rx="3" fill="#4338CA"/>
    <text x="58" y="133" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">MIXS X-RAY LIGHT</text>
  </svg>`;
}

export function svgGtaViRecordSales() {
  return `<svg viewBox="0 0 116 142" width="116" height="142" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="viceSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1E1B4B"/>
        <stop offset="100%" stop-color="#4C1D4B"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="116" height="142" rx="5" fill="url(#viceSky)"/>
    <!-- Sunset disc & coastal palm silhouette -->
    <circle cx="34" cy="46" r="19" fill="#FB7185" opacity="0.38"/>
    <path d="M 24 88 Q 26 68 29 56 M 29 56 Q 20 52 16 57 M 29 56 Q 23 48 18 49 M 29 56 Q 37 48 41 51 M 29 56 Q 38 54 42 59" fill="none" stroke="#F472B6" stroke-width="1.6" opacity="0.55" stroke-linecap="round"/>

    <!-- Comparative Day-1 Entertainment Launch Bars -->
    <!-- Prior Film Record (~$0.36B) -->
    <rect x="14" y="96" width="20" height="18" rx="2" fill="#64748B"/>
    <text x="24" y="92" text-anchor="middle" fill="#CBD5E1" font-family="Avenir Next Condensed, sans-serif" font-size="9" font-weight="700">FILM</text>

    <!-- Prior Game Record (~$1.0B) -->
    <rect x="44" y="82" width="20" height="32" rx="2" fill="#94A3B8"/>
    <text x="54" y="78" text-anchor="middle" fill="#E2E8F0" font-family="Avenir Next Condensed, sans-serif" font-size="9" font-weight="700">$1.0B</text>

    <!-- GTA VI $3.79B Towering Record Bar -->
    <rect x="74" y="28" width="28" height="86" rx="2.5" fill="#F59E0B" stroke="#FEF08A" stroke-width="1.5"/>
    <text x="88" y="21" text-anchor="middle" fill="#FEF08A" font-family="Avenir Next Condensed, sans-serif" font-size="12" font-weight="800">$3.79B</text>
    <text x="88" y="74" text-anchor="middle" fill="#1E1B4B" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800" transform="rotate(-90 88 74)">GTA VI DAY-1</text>

    <line x1="10" y1="114" x2="106" y2="114" stroke="#F8FAFC" stroke-width="1.4"/>

    <rect x="5" y="121" width="106" height="17" rx="3" fill="#B45309"/>
    <text x="58" y="133" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, sans-serif" font-size="10.5" font-weight="800">32.5M PRE-ORDERS</text>
  </svg>`;
}
