import { useId } from 'react';

const numerals=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI','XXII'];
/** An ornamental atlas, not a calculated matrix. Exactly 22 decorative sectors. */
export function CelestialRing({className}:{className?:string}) {
  return <svg className={className} viewBox="0 0 900 900" fill="none" aria-hidden="true" focusable="false">
    <g stroke="currentColor" strokeWidth=".7"><circle cx="450" cy="450" r="422"/><circle cx="450" cy="450" r="403"/><circle cx="450" cy="450" r="354"/><circle cx="450" cy="450" r="338"/><circle cx="450" cy="450" r="278"/></g>
    {numerals.map((numeral,index)=><g key={numeral} transform={`rotate(${index*360/22} 450 450)`}>
      <path d="M450 28V47 M450 112V172" stroke="currentColor" strokeWidth=".8"/>
      <path d="M450 172V234" stroke="currentColor" strokeWidth=".6" opacity=".45"/>
      <text x="450" y="88" textAnchor="middle" fill="currentColor" fontSize="13" letterSpacing="2" fontFamily="Arial, sans-serif">{numeral}</text>
      <g transform="translate(450 143)" stroke="currentColor" strokeWidth=".9">
        {index%4===0?<path d="M0-12 3-3 12 0 3 3 0 12-3 3-12 0-3-3Z"/>:index%4===1?<><path d="M-8 0H8 M0-8V8"/><circle r="4"/></>:index%4===2?<path d="M0-9 7 4H-7Z M-7 9H7"/>:<path d="M-8-7 0 5 8-7 M-8 7H8"/>}
      </g>
      <path d="M444 42V48 M456 42V48" stroke="currentColor" strokeWidth=".6" opacity=".7"/>
    </g>)}
    <g stroke="currentColor" strokeWidth=".7" opacity=".65"><path d="M450 172 691 589 209 589Z M450 728 209 311 691 311Z"/><path d="M450 234 666 450 450 666 234 450Z"/><circle cx="450" cy="450" r="167"/><path d="M450 243V657 M243 450H657" strokeDasharray="2 8"/></g>
    <circle cx="450" cy="450" r="8" stroke="currentColor" strokeWidth=".8"/>
  </svg>;
}

/** Original folded-wing reliquary: entirely local SVG, no sampled reference artwork. */
export function FoldedWingOrnament({className}:{className?:string}) {
  const uid=useId();
  return <svg className={className} viewBox="0 0 360 620" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${uid}-stone`} x1="60" y1="145" x2="290" y2="390" gradientUnits="userSpaceOnUse"><stop stopColor="var(--hero-stone-light)"/><stop offset=".38" stopColor="var(--hero-stone-mid)"/><stop offset=".62" stopColor="var(--hero-stone-light)"/><stop offset="1" stopColor="var(--hero-stone-shadow)"/></linearGradient>
      <linearGradient id={`${uid}-fold`} x1="204" y1="170" x2="115" y2="410" gradientUnits="userSpaceOnUse"><stop stopColor="var(--hero-stone-shadow)"/><stop offset=".45" stopColor="var(--hero-stone-mid)"/><stop offset="1" stopColor="var(--hero-stone-light)"/></linearGradient>
      <linearGradient id={`${uid}-edge`} x1="145" y1="120" x2="221" y2="505" gradientUnits="userSpaceOnUse"><stop stopColor="var(--hero-stone-light)"/><stop offset="1" stopColor="var(--hero-stone-mid)"/></linearGradient>
    </defs>
    <path d="M185 309C121 293 53 244 25 93 96 124 157 178 185 254 206 166 255 77 332 34 319 175 263 286 185 309Z" fill={`url(#${uid}-stone)`}/>
    <path d="M185 308C134 272 112 200 25 93 96 124 157 178 185 254 206 166 255 77 332 34 253 153 245 253 185 308Z" fill={`url(#${uid}-fold)`} opacity=".76"/>
    <g stroke="var(--hero-stone-line)" strokeWidth="1" opacity=".75">
      <path d="M38 118C95 151 145 221 171 277 M48 149C104 178 142 227 168 286 M62 181C112 204 142 239 165 292 M80 213C124 230 146 254 162 297"/>
      <path d="M315 63C261 112 229 206 199 274 M309 103C263 144 233 216 203 281 M298 144C259 178 233 236 207 288 M282 184C253 213 231 256 210 294"/>
    </g>
    <path d="M181 210C224 251 227 303 183 345 141 385 131 432 180 491 108 465 94 408 125 360 156 313 184 277 181 210Z" fill={`url(#${uid}-edge)`}/>
    <path d="M181 210C182 277 156 313 125 360 104 394 110 435 138 459 120 416 144 383 183 345 223 306 221 260 181 210Z" fill={`url(#${uid}-fold)`}/>
    <path d="M181 307C137 345 151 381 194 414 234 444 231 487 177 537 255 516 279 464 245 421 212 379 182 352 181 307Z" fill={`url(#${uid}-stone)`}/>
    <path d="M181 307C182 352 212 379 245 421 267 449 259 482 231 506 246 470 226 447 194 414 153 379 138 348 181 307Z" fill={`url(#${uid}-fold)`}/>
    <path d="M180 491C164 522 167 555 181 586 201 554 198 525 180 491Z" fill={`url(#${uid}-edge)`}/>
    <g stroke="var(--hero-stone-line)" strokeWidth=".8" opacity=".7"><path d="M178 246C198 292 170 322 148 355 M164 386C168 412 203 430 215 450 M184 513C178 537 180 556 182 569"/></g>
    <path d="M176 298 186 288 197 298 186 309Z" stroke="var(--hero-gold)" strokeWidth="1.1"/>
  </svg>;
}
