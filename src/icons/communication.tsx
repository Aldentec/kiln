import { createIcon } from './base';

export const CallIcon = createIcon('CallIcon',
  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.379c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.985l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.985-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 5.25V4.5z" />,
);

export const ContactIcon = createIcon('ContactIcon',
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 18c0-3 2.5-5 5-5s5 2 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const EnvelopeIcon = createIcon('EnvelopeIcon',
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M3 6l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </>,
);

export const GlobeIcon = createIcon('GlobeIcon',
  <>
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
    <ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M3 12h18" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M4.5 7.5h15M4.5 16.5h15" fill="none" stroke="currentColor" strokeWidth="2" />
  </>,
);

export const BugIcon = createIcon('BugIcon',
  <>
    {/* Body */}
    <ellipse cx="12" cy="14" rx="5" ry="7" fill="none" stroke="currentColor" strokeWidth="2" />
    {/* Center line */}
    <path d="M12 7v14" stroke="currentColor" strokeWidth="2" />
    {/* Head */}
    <circle cx="12" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
    {/* Antennae */}
    <path d="M10.5 4.5L8 2M13.5 4.5l2.5-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Left legs */}
    <path d="M7 10H3M7 14H2M7 18H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Right legs */}
    <path d="M17 10h4M17 14h5M17 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const LockPrivateIcon = createIcon('LockPrivateIcon',
  <>
    <rect x="6" y="11" width="12" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="15.5" r="1.5" fill="currentColor" />
    <path d="M12 17v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const SecurityIcon = createIcon('SecurityIcon',
  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" />,
);

export const MicrophoneIcon = createIcon('MicrophoneIcon',
  <>
    <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
    <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
  </>,
);

export const MicrophoneOffIcon = createIcon('MicrophoneOffIcon',
  <>
    <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
    <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
    <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18z" />
  </>,
);
