function tagBadge(label, bg, customWidth = null) {
  const width = customWidth ?? Math.max(138, Math.round(label.length * 10.6 + 22));
  return `<g>
    <rect x="8" y="8" width="${width}" height="29" rx="4" fill="${bg}" stroke="#0F172A" stroke-width="1.5"/>
    <text x="${8 + width / 2}" y="28" text-anchor="middle" fill="#FFFFFF" font-family="Avenir Next Condensed, Helvetica Neue, sans-serif" font-size="19.2" font-weight="800" letter-spacing="0.3">${label}</text>
  </g>`;
}

function bottomSplitBadges(leftText, leftBg, rightText, rightBg) {
  return `<g font-family="Avenir Next Condensed, Helvetica Neue, sans-serif" font-size="19" font-weight="800">
    <rect x="8" y="161" width="141" height="29" rx="4" fill="${leftBg}"/>
    <text x="78.5" y="181" text-anchor="middle" fill="#FFFFFF">${leftText}</text>
    <rect x="157" y="161" width="141" height="29" rx="4" fill="${rightBg}"/>
    <text x="227.5" y="181" text-anchor="middle" fill="#FFFFFF">${rightText}</text>
  </g>`;
}

export function svgHeroKyivPoland() {
  return `<svg viewBox="0 0 306 198" width="306" height="198" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="heroBlast" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="50%" stop-color="#F97316"/>
        <stop offset="100%" stop-color="#DC2626" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <!-- Left Half: Kyiv & Dnipro River Bridges -->
    <rect x="0" y="0" width="151" height="198" rx="6" fill="#10233A"/>
    <g stroke="#233E5C" stroke-width="1.4">
      <line x1="8" y1="58" x2="144" y2="66"/>
      <line x1="8" y1="106" x2="144" y2="100"/>
      <line x1="12" y1="146" x2="144" y2="152"/>
      <line x1="42" y1="36" x2="36" y2="164"/>
    </g>
    <!-- Dnipro River -->
    <path d="M 68 0 C 74 42, 58 72, 76 108 C 90 138, 82 168, 96 202 L 122 202 C 108 168, 116 136, 100 104 C 84 70, 98 40, 92 0 Z"
          fill="#1D6FA5" stroke="#7DD3FC" stroke-width="1.8"/>
    <!-- 3 Bridges across Dnipro -->
    <g stroke="#F1F5F9" stroke-width="6" stroke-linecap="round">
      <line x1="54" y1="58" x2="108" y2="54"/>
      <line x1="60" y1="98" x2="116" y2="94"/>
      <line x1="68" y1="138" x2="124" y2="134"/>
    </g>
    <!-- Smoke + 3 Starbursts -->
    <g fill="#090F1A" opacity="0.6">
      <circle cx="90" cy="43" r="11"/>
      <circle cx="98" cy="83" r="11"/>
      <circle cx="106" cy="123" r="11"/>
    </g>
    <circle cx="82" cy="56" r="17" fill="url(#heroBlast)"/>
    <polygon points="82,43 86,51 95,50 88,56 93,64 84,60 81,68 78,59 69,61 76,55 71,48 79,51" fill="#FEF08A" stroke="#DC2626" stroke-width="1.2"/>
    <circle cx="89" cy="96" r="17" fill="url(#heroBlast)"/>
    <polygon points="89,83 93,91 102,90 95,96 100,104 91,100 88,108 85,99 76,101 83,95 78,88 86,91" fill="#FEF08A" stroke="#DC2626" stroke-width="1.2"/>
    <circle cx="96" cy="136" r="17" fill="url(#heroBlast)"/>
    <polygon points="96,123 100,131 109,130 102,136 107,144 98,140 95,148 92,139 83,141 90,135 85,128 93,131" fill="#FEF08A" stroke="#DC2626" stroke-width="1.2"/>

    <!-- Center Divider -->
    <line x1="153" y1="4" x2="153" y2="198" stroke="#F4EFE3" stroke-width="3"/>

    <!-- Right Half: SE Poland Border Radar & NATO Fighter Scramble -->
    <rect x="155" y="0" width="151" height="198" rx="6" fill="#0B2229"/>
    <g fill="none" stroke="#2DD4BF" stroke-opacity="0.28" stroke-width="1.3">
      <circle cx="228" cy="92" r="32"/>
      <circle cx="228" cy="92" r="62"/>
      <line x1="162" y1="92" x2="298" y2="92"/>
      <line x1="228" y1="22" x2="228" y2="160"/>
    </g>
    <!-- Poland-Ukraine Dashed Border -->
    <path d="M 244 10 L 236 56 L 250 102 L 238 158" fill="none" stroke="#FBBF24" stroke-width="3" stroke-dasharray="7,4"/>
    <!-- 2 Red Missile Trajectories into SE Poland -->
    <path d="M 300 48 Q 256 42 206 72" fill="none" stroke="#FB7185" stroke-width="3.2" stroke-dasharray="6,4"/>
    <path d="M 300 106 Q 258 96 212 122" fill="none" stroke="#FB7185" stroke-width="3.2" stroke-dasharray="6,4"/>
    <circle cx="204" cy="73" r="8.5" fill="#EF4444" stroke="#FEF08A" stroke-width="2.2"/>
    <circle cx="210" cy="123" r="8.5" fill="#EF4444" stroke="#FEF08A" stroke-width="2.2"/>
    <!-- 2 Crisp Swept-Wing NATO Fighter Silhouettes -->
    <path d="M 196 54 L 172 44 L 177 52 L 164 53 L 160 48 L 160 60 L 164 55 L 177 56 L 172 64 Z" fill="#F8FAFC" stroke="#38BDF8" stroke-width="1"/>
    <path d="M 200 104 L 176 94 L 181 102 L 168 103 L 164 98 L 164 110 L 168 105 L 181 106 L 176 114 Z" fill="#F8FAFC" stroke="#38BDF8" stroke-width="1"/>

    ${tagBadge("EUROPE · WAR", "#B91C1C", 138)}
    ${bottomSplitBadges("3 KYIV BRIDGES", "#991B1B", "SE POLAND HIT", "#B91C1C")}
  </svg>`;
}

export function svgMarketsCorrection() {
  return `<svg viewBox="0 0 306 198" width="306" height="198" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="306" height="198" rx="6" fill="#111827"/>
    <!-- Baseline & Grid -->
    <line x1="16" y1="48" x2="290" y2="48" stroke="#64748B" stroke-width="2"/>
    <line x1="16" y1="90" x2="290" y2="90" stroke="#1E293B" stroke-width="1.5"/>
    <line x1="16" y1="132" x2="290" y2="132" stroke="#1E293B" stroke-width="1.5"/>

    <!-- AI Silicon Chip Icon (Top Right, clear of baseline) -->
    <g transform="translate(238,5)">
      <rect x="8" y="5" width="42" height="28" rx="4" fill="#1E293B" stroke="#FBBF24" stroke-width="2.2"/>
      <rect x="18" y="11" width="22" height="16" rx="2" fill="#DC2626" stroke="#FEF08A" stroke-width="1.5"/>
      <line x1="2" y1="12" x2="8" y2="12" stroke="#FBBF24" stroke-width="2.2"/>
      <line x1="2" y1="19" x2="8" y2="19" stroke="#FBBF24" stroke-width="2.2"/>
      <line x1="2" y1="26" x2="8" y2="26" stroke="#FBBF24" stroke-width="2.2"/>
      <line x1="50" y1="12" x2="56" y2="12" stroke="#FBBF24" stroke-width="2.2"/>
      <line x1="50" y1="19" x2="56" y2="19" stroke="#FBBF24" stroke-width="2.2"/>
      <line x1="50" y1="26" x2="56" y2="26" stroke="#FBBF24" stroke-width="2.2"/>
    </g>

    <!-- 4 Strictly Proportional Descending Market Bars (-3.7%, -5.1%, -5.3%, -5.4%) -->
    <rect x="26" y="48" width="48" height="69" rx="4" fill="#F97316"/>
    <rect x="92" y="48" width="48" height="93" rx="4" fill="#EF4444"/>
    <rect x="158" y="48" width="48" height="98" rx="4" fill="#DC2626"/>
    <rect x="224" y="48" width="48" height="101" rx="4" fill="#991B1B" stroke="#FCA5A5" stroke-width="1.5"/>

    <!-- Bold Plunging Arrow Overlay -->
    <path d="M 38 66 L 116 96 L 182 112 L 252 128" fill="none" stroke="#FEF08A" stroke-width="4.5" stroke-linecap="round"/>
    <polygon points="262,132 244,135 250,118" fill="#FEF08A"/>

    ${tagBadge("US · ASIA · AUS", "#DC2626")}
    ${bottomSplitBadges("NASDAQ -5.3%", "#B91C1C", "NIKKEI -5.1%", "#7F1D1D")}
  </svg>`;
}

export function svgCop31Overtime() {
  return `<svg viewBox="0 0 306 198" width="306" height="198" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="306" height="198" rx="6" fill="#0D2B30"/>

    <!-- Treaty Document with Crossed-Out Fossil Fuel Barrel/Smokestack -->
    <rect x="22" y="44" width="124" height="112" rx="6" fill="#FFFDF7" stroke="#94A3B8" stroke-width="2"/>
    <!-- Oil Barrel + Flame Silhouette -->
    <rect x="60" y="66" width="48" height="62" rx="6" fill="#334155"/>
    <line x1="58" y1="84" x2="110" y2="84" stroke="#94A3B8" stroke-width="3"/>
    <line x1="58" y1="108" x2="110" y2="108" stroke="#94A3B8" stroke-width="3"/>
    <path d="M 84 74 C 94 86, 94 98, 84 104 C 74 98, 74 86, 84 74 Z" fill="#F59E0B"/>
    <!-- Bold Crimson Strike-Out X -->
    <line x1="38" y1="58" x2="130" y2="142" stroke="#DC2626" stroke-width="7" stroke-linecap="round"/>
    <line x1="130" y1="58" x2="38" y2="142" stroke="#DC2626" stroke-width="7" stroke-linecap="round"/>

    <!-- Midnight Overtime Clock -->
    <circle cx="224" cy="72" r="40" fill="#134E4A" stroke="#FBBF24" stroke-width="4"/>
    <circle cx="224" cy="72" r="4" fill="#FEF08A"/>
    <line x1="224" y1="72" x2="224" y2="40" stroke="#FEF08A" stroke-width="4" stroke-linecap="round"/>
    <line x1="224" y1="72" x2="248" y2="58" stroke="#FB7185" stroke-width="4" stroke-linecap="round"/>

    <!-- Suspended Plenary Gavel -->
    <g transform="translate(190,116) rotate(-22)">
      <rect x="0" y="6" width="38" height="18" rx="3" fill="#D97706" stroke="#FEF3C7" stroke-width="1.8"/>
      <rect x="16" y="24" width="7" height="28" rx="2" fill="#F59E0B"/>
    </g>
    <rect x="184" y="148" width="76" height="9" rx="3" fill="#B45309"/>

    ${tagBadge("CLIMATE · COP31", "#0F766E")}
    ${bottomSplitBadges("FOSSILS CUT", "#991B1B", "OVERTIME", "#115E59")}
  </svg>`;
}

export function svgCycloneAkvan() {
  return `<svg viewBox="0 0 306 198" width="306" height="198" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="306" height="198" rx="6" fill="#0A3A52"/>
    <!-- India Eastern Coastline (Odisha & North Andhra) -->
    <path d="M 0 0 L 166 0 L 146 38 L 118 76 L 96 116 L 68 164 L 0 164 Z" fill="#DFD6BE" stroke="#94A3B8" stroke-width="2"/>
    <path d="M 0 36 L 126 36 L 100 84 L 68 136 L 0 136 Z" fill="#C9C0A6" opacity="0.5"/>

    <!-- Storm Track Arrow from Bay of Bengal -->
    <path d="M 218 140 Q 178 118 134 94" fill="none" stroke="#FDE047" stroke-width="4" stroke-dasharray="7,5"/>

    <!-- Giant Cyclone Spiral at Gopalpur Landfall -->
    <g transform="translate(128,94)">
      <circle cx="0" cy="0" r="46" fill="#38BDF8" opacity="0.22"/>
      <path d="M -8 -38 C 28 -42, 46 -12, 32 22 C 18 42, -16 46, -34 26" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
      <path d="M 8 38 C -28 42, -46 12, -32 -22 C -18 -42, 16 -46, 34 -26" fill="none" stroke="#BAE6FD" stroke-width="5" stroke-linecap="round"/>
      <path d="M -4 -20 C 14 -22, 24 -6, 16 12 C 10 22, -8 24, -18 14" fill="none" stroke="#E0F2FE" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="10" fill="#EF4444" stroke="#FEF08A" stroke-width="3"/>
    </g>

    <!-- Evacuation Safety Check Shield (Right) -->
    <path d="M 224 46 L 282 46 L 282 88 Q 253 116 224 88 Z" fill="#047857" stroke="#A7F3D0" stroke-width="2.5"/>
    <path d="M 239 76 L 249 87 L 269 63" fill="none" stroke="#FFFFFF" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>

    ${tagBadge("ASIA · WEATHER", "#0369A1")}
    ${bottomSplitBadges("ODISHA COAST", "#0C4A6E", "372K SAFE", "#047857")}
  </svg>`;
}

export function svgUkEuReset() {
  return `<svg viewBox="0 0 306 198" width="306" height="198" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="306" height="198" rx="6" fill="#14244B"/>
    <!-- Channel Waves -->
    <path d="M 88 138 Q 120 130 153 138 T 218 138" fill="none" stroke="#38BDF8" stroke-width="2.5" opacity="0.6"/>

    <!-- Golden Channel Reset Bridge Arch -->
    <path d="M 78 104 Q 153 42 228 104" fill="none" stroke="#FBBF24" stroke-width="6"/>
    <line x1="88" y1="104" x2="218" y2="104" stroke="#FDE68A" stroke-width="4"/>
    <line x1="130" y1="76" x2="130" y2="104" stroke="#FBBF24" stroke-width="2.5"/>
    <line x1="153" y1="69" x2="153" y2="104" stroke="#FBBF24" stroke-width="2.5"/>
    <line x1="176" y1="76" x2="176" y2="104" stroke="#FBBF24" stroke-width="2.5"/>

    <!-- UK Union Jack Medallion (Left) -->
    <g transform="translate(68,98)">
      <circle cx="0" cy="0" r="38" fill="#1D4ED8" stroke="#FFFFFF" stroke-width="3"/>
      <line x1="-30" y1="-20" x2="30" y2="20" stroke="#FFFFFF" stroke-width="7"/>
      <line x1="-30" y1="20" x2="30" y2="-20" stroke="#FFFFFF" stroke-width="7"/>
      <line x1="-36" y1="0" x2="36" y2="0" stroke="#FFFFFF" stroke-width="12"/>
      <line x1="0" y1="-36" x2="0" y2="36" stroke="#FFFFFF" stroke-width="12"/>
      <line x1="-36" y1="0" x2="36" y2="0" stroke="#DC2626" stroke-width="6.5"/>
      <line x1="0" y1="-36" x2="0" y2="36" stroke="#DC2626" stroke-width="6.5"/>
      <circle cx="0" cy="0" r="38" fill="none" stroke="#FFFFFF" stroke-width="3"/>
    </g>

    <!-- EU 12-Star Medallion (Right) -->
    <g transform="translate(238,98)">
      <circle cx="0" cy="0" r="38" fill="#1E3A8A" stroke="#FBBF24" stroke-width="3"/>
      <circle cx="0" cy="-24" r="3.4" fill="#FACC15"/>
      <circle cx="12" cy="-21" r="3.4" fill="#FACC15"/>
      <circle cx="21" cy="-12" r="3.4" fill="#FACC15"/>
      <circle cx="24" cy="0" r="3.4" fill="#FACC15"/>
      <circle cx="21" cy="12" r="3.4" fill="#FACC15"/>
      <circle cx="12" cy="21" r="3.4" fill="#FACC15"/>
      <circle cx="0" cy="24" r="3.4" fill="#FACC15"/>
      <circle cx="-12" cy="21" r="3.4" fill="#FACC15"/>
      <circle cx="-21" cy="12" r="3.4" fill="#FACC15"/>
      <circle cx="-24" cy="0" r="3.4" fill="#FACC15"/>
      <circle cx="-21" cy="-12" r="3.4" fill="#FACC15"/>
      <circle cx="-12" cy="-21" r="3.4" fill="#FACC15"/>
    </g>

    ${tagBadge("EUROPE · TRADE", "#1D4ED8")}
    ${bottomSplitBadges("UK + EU", "#1E40AF", "100K VISAS", "#B45309")}
  </svg>`;
}

export function svgYemenHodeidah() {
  return `<svg viewBox="0 0 306 198" width="306" height="198" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="portBlast" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FEF08A"/>
        <stop offset="50%" stop-color="#F97316"/>
        <stop offset="100%" stop-color="#DC2626" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <!-- Red Sea Waterway -->
    <rect x="0" y="0" width="306" height="198" rx="6" fill="#0B354D"/>
    <!-- African Horn Coast (Bottom Left) -->
    <path d="M 0 96 L 52 128 L 76 164 L 0 164 Z" fill="#C9BEA3" stroke="#64748B" stroke-width="1.8"/>
    <!-- Arabian Peninsula / Yemen Coast (Right) -->
    <path d="M 134 0 L 306 0 L 306 164 L 188 164 L 166 132 L 158 92 L 142 46 Z" fill="#DFD4B8" stroke="#64748B" stroke-width="2"/>

    <!-- Red Sea Shipping Lane Dashed Line & Warning Triangle -->
    <path d="M 58 44 L 128 148" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-dasharray="6,5"/>
    <polygon points="88,110 108,144 68,144" fill="#FACC15" stroke="#0F172A" stroke-width="2"/>
    <rect x="86" y="121" width="4" height="11" rx="1" fill="#0F172A"/>
    <circle cx="88" cy="138" r="2.3" fill="#0F172A"/>

    <!-- Port Crane & Rising Smoke at Hodeidah -->
    <path d="M 164 96 C 166 68, 188 54, 208 46 C 216 62, 196 78, 180 96 Z" fill="#0F172A" opacity="0.65"/>
    <line x1="150" y1="108" x2="188" y2="108" stroke="#334155" stroke-width="4"/>
    <!-- Strike Starburst on Hodeidah Port -->
    <circle cx="168" cy="100" r="28" fill="url(#portBlast)"/>
    <polygon points="168,78 174,91 188,89 178,99 186,112 172,106 167,119 162,105 148,109 158,98 150,87 163,91" fill="#FEF08A" stroke="#DC2626" stroke-width="1.5"/>

    <!-- 2 High-Contrast Coalition Strike Aircraft Vectors -->
    <path d="M 244 48 L 194 80" fill="none" stroke="#DC2626" stroke-width="3" stroke-dasharray="5,4"/>
    <path d="M 218 62 L 244 48 L 237 58 L 252 60 L 242 70 L 235 63 Z" fill="#0F172A" stroke="#FFFFFF" stroke-width="1.3"/>
    <path d="M 254 80 L 280 66 L 273 76 L 288 78 L 278 88 L 271 81 Z" fill="#0F172A" stroke="#FFFFFF" stroke-width="1.3"/>

    ${tagBadge("MIDEAST · YEMEN", "#991B1B")}
    ${bottomSplitBadges("HODEIDAH", "#B91C1C", "RED SEA", "#0E4F70")}
  </svg>`;
}

export function svgWhoDrcEbola() {
  return `<svg viewBox="0 0 306 198" width="306" height="198" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="306" height="198" rx="6" fill="#172234"/>
    <!-- Central & East Africa Landmass -->
    <path d="M 68 42 L 218 42 L 254 74 L 238 124 L 212 162 L 88 162 L 76 118 L 56 80 Z" fill="#DFD6BE" stroke="#64748B" stroke-width="2"/>
    <!-- Regional Border Line (Sudan North / DRC Center-South) -->
    <path d="M 68 84 L 172 84 L 196 102 L 190 160" fill="none" stroke="#64748B" stroke-width="2" stroke-dasharray="5,4"/>

    <!-- Sudan UN Consultations Marker (North-East) -->
    <polygon points="208,48 224,64 208,80 192,64" fill="#D97706" stroke="#FFFFFF" stroke-width="2"/>
    <circle cx="208" cy="64" r="5" fill="#FFFBEB"/>

    <!-- Eastern DRC Outbreak Containment Rings & WHO Medical Cross -->
    <circle cx="164" cy="116" r="38" fill="#EF4444" opacity="0.24"/>
    <circle cx="164" cy="116" r="38" fill="none" stroke="#DC2626" stroke-width="3.2" stroke-dasharray="7,4"/>
    <circle cx="164" cy="116" r="23" fill="#0284C7" stroke="#FFFFFF" stroke-width="3"/>
    <rect x="159" y="102" width="10" height="28" rx="1.5" fill="#FFFFFF"/>
    <rect x="150" y="111" width="28" height="10" rx="1.5" fill="#FFFFFF"/>

    ${tagBadge("AFRICA · HEALTH", "#DC2626")}
    ${bottomSplitBadges("11,613 CASES", "#B91C1C", "EASTERN DRC", "#0369A1")}
  </svg>`;
}

export function svgMexicoChapoIsidro() {
  return `<svg viewBox="0 0 306 198" width="306" height="198" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="306" height="198" rx="6" fill="#0E2F44"/>
    <!-- Mexico Landmass + Baja California -->
    <path d="M 38 42 L 138 42 L 154 78 L 188 112 L 222 104 L 236 128 L 210 156 L 154 146 L 112 118 L 74 92 L 54 58 Z" fill="#DFD6BE" stroke="#64748B" stroke-width="2"/>
    <path d="M 34 48 L 54 96 L 44 100 L 24 52 Z" fill="#DFD6BE" stroke="#64748B" stroke-width="1.8"/>
    <!-- Highlighted Sinaloa State Zone -->
    <path d="M 64 58 L 96 62 L 106 94 L 78 96 Z" fill="#F97316" opacity="0.65" stroke="#DC2626" stroke-width="2"/>

    <!-- Radar Target Rings on Sinaloa -->
    <circle cx="88" cy="80" r="30" fill="none" stroke="#FDE047" stroke-width="2.5" stroke-dasharray="6,4"/>

    <!-- Large Federal Security Shield & Arrest Lock (Right) -->
    <path d="M 206 42 L 278 42 L 278 92 Q 242 126 206 92 Z" fill="#1E3A8A" stroke="#FBBF24" stroke-width="3"/>
    <path d="M 229 70 A 13 13 0 0 1 255 70 L 255 78 L 229 78 Z" fill="none" stroke="#FEF08A" stroke-width="4"/>
    <rect x="223" y="76" width="38" height="26" rx="4" fill="#DC2626" stroke="#FFFFFF" stroke-width="2"/>
    <circle cx="242" cy="89" r="4" fill="#FEF08A"/>

    <!-- Link line from Sinaloa to Raid Shield -->
    <line x1="118" y1="80" x2="204" y2="76" stroke="#FDE047" stroke-width="3" stroke-dasharray="6,4"/>

    ${tagBadge("LATAM · SECURITY", "#0284C7")}
    ${bottomSplitBadges("SINALOA RAID", "#B91C1C", "FBI TOP-10", "#1E40AF")}
  </svg>`;
}

export function svgBepiColomboSpace() {
  return `<svg viewBox="0 0 306 198" width="306" height="198" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="306" height="198" rx="6" fill="#090E24"/>
    <!-- Crisp Starfield -->
    <circle cx="170" cy="24" r="1.8" fill="#FFFFFF"/>
    <circle cx="42" cy="58" r="1.8" fill="#BAE6FD"/>
    <circle cx="282" cy="116" r="2" fill="#FFFFFF"/>
    <circle cx="212" cy="142" r="1.6" fill="#E2E8F0"/>
    <circle cx="122" cy="148" r="1.5" fill="#FFFFFF"/>

    <!-- Glowing Crab Nebula X-Ray Remnant (Top Right) -->
    <ellipse cx="244" cy="54" rx="42" ry="26" transform="rotate(-16 244 54)" fill="#C026D3" opacity="0.46"/>
    <ellipse cx="244" cy="54" rx="25" ry="15" transform="rotate(-16 244 54)" fill="#38BDF8" opacity="0.86"/>
    <circle cx="244" cy="54" r="6" fill="#FFFFFF"/>

    <!-- X-Ray Spectrometer Observation Cone -->
    <polygon points="148,108 214,34 268,74" fill="#38BDF8" opacity="0.24"/>
    <line x1="148" y1="108" x2="244" y2="54" stroke="#67E8F9" stroke-width="3" stroke-dasharray="6,4"/>

    <!-- Sunlit Cratered Mercury Crescent (Left) -->
    <circle cx="62" cy="118" r="36" fill="#334155"/>
    <path d="M 62 82 A 36 36 0 0 1 62 154 A 22 36 0 0 0 62 82 Z" fill="#FDBA74"/>
    <circle cx="74" cy="106" r="4.5" fill="#EA580C" opacity="0.45"/>
    <circle cx="78" cy="126" r="3.5" fill="#EA580C" opacity="0.45"/>

    <!-- ESA/JAXA BepiColombo Spacecraft -->
    <g transform="translate(148,110) rotate(-22)">
      <rect x="-48" y="-7" width="32" height="14" rx="2" fill="#2563EB" stroke="#93C5FD" stroke-width="1.8"/>
      <rect x="16" y="-7" width="32" height="14" rx="2" fill="#2563EB" stroke="#93C5FD" stroke-width="1.8"/>
      <rect x="-14" y="-13" width="28" height="26" rx="4" fill="#F59E0B" stroke="#FEF3C7" stroke-width="2.2"/>
      <circle cx="0" cy="0" r="5" fill="#38BDF8"/>
    </g>

    ${tagBadge("SPACE · SCIENCE", "#4338CA")}
    ${bottomSplitBadges("ESA/JAXA MIXS", "#6D28D9", "MERCURY EVE", "#4338CA")}
  </svg>`;
}
