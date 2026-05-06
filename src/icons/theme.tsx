import { createIcon } from './base';

export const SunIcon = createIcon('SunIcon',
  <>
    <circle cx="12" cy="12" r="4" />
    {/* Top */}
    <path d="M12 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Bottom */}
    <path d="M12 20v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Right */}
    <path d="M22 12h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Left */}
    <path d="M4 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Top-right */}
    <path d="M18.5 5.5l-1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Bottom-left */}
    <path d="M5.5 18.5l1.5-1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Bottom-right */}
    <path d="M18.5 18.5l-1.5-1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Top-left */}
    <path d="M5.5 5.5l1.5 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const MoonIcon = createIcon('MoonIcon',
  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />,
);

export const LightDarkIcon = createIcon('LightDarkIcon',
  <>
    {/* Right half filled — represents the contrast/theme-toggle concept */}
    <path d="M12 3.75A8.25 8.25 0 0 1 12 20.25Z" />
    {/* Circle outline (ring) via evenodd */}
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" />
  </>,
);
