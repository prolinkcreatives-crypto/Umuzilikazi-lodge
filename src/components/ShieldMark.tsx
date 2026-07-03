import type { SVGProps } from 'react';

/**
 * The Umuzilikazi shield — recreated from the lodge's actual signage
 * (oval/vesica shield, slat pattern, crossed paddles). This is the
 * site's signature motif: used as the nav logo, a faint watermark on
 * dark sections, and a section-divider element. Never as a generic
 * "African pattern" filler — it should always read as this brand's mark.
 *
 * currentColor drives the shield fill so it can sit on light or dark
 * backgrounds; the paddle and ornament accents stay fixed brand tones.
 */
export default function ShieldMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Moselekatse shield mark"
      {...props}
    >
      <g>
        <rect x="96.5" y="20" width="7" height="220" rx="3.5" fill="#755B00" transform="rotate(-32 100 130)" />
        <ellipse cx="100" cy="34" rx="13" ry="20" fill="#F0EDED" transform="rotate(-32 100 34)" />
        <rect x="96.5" y="20" width="7" height="220" rx="3.5" fill="#755B00" transform="rotate(32 100 130)" />
        <ellipse cx="100" cy="34" rx="13" ry="20" fill="#F0EDED" transform="rotate(32 100 34)" />
      </g>

      <rect x="91" y="6" width="18" height="34" rx="9" fill="#FCF9F8" />

      <path
        d="M100 58
           C 72 80, 58 118, 58 150
           C 58 182, 72 220, 100 244
           C 128 220, 142 182, 142 150
           C 142 118, 128 80, 100 58 Z"
        fill="currentColor"
        stroke="#FCF9F8"
        strokeWidth="4"
      />

      <g fill="#FCF9F8">
        <rect x="76" y="116" width="18" height="6" rx="1.5" />
        <rect x="76" y="134" width="18" height="6" rx="1.5" />
        <rect x="76" y="152" width="18" height="6" rx="1.5" />
        <rect x="76" y="170" width="18" height="6" rx="1.5" />

        <rect x="106" y="116" width="18" height="6" rx="1.5" />
        <rect x="106" y="134" width="18" height="6" rx="1.5" />
        <rect x="106" y="152" width="18" height="6" rx="1.5" />
        <rect x="106" y="170" width="18" height="6" rx="1.5" />
      </g>
    </svg>
  );
}
