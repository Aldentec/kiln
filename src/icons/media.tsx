import { createIcon } from './base';

export const AudioFullIcon = createIcon('AudioFullIcon',
  <>
    <path d="M4 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const AudioHalfIcon = createIcon('AudioHalfIcon',
  <>
    <path d="M4 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 11v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const AudioOffIcon = createIcon('AudioOffIcon',
  <>
    <path d="M4 10v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const Backward10SecondsIcon = createIcon('Backward10SecondsIcon',
  <>
    <path d="M10 4L6 8l4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const Forward10SecondsIcon = createIcon('Forward10SecondsIcon',
  <>
    <path d="M14 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 6v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const ClosedCaptionIcon = createIcon('ClosedCaptionIcon',
  <>
    <rect x="3" y="6" width="7" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="6" width="7" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M6 9v6M9 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M17 9v6M20 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const ClosedCaptionUnavailableIcon = createIcon('ClosedCaptionUnavailableIcon',
  <>
    <rect x="3" y="6" width="7" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="6" width="7" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M6 9v6M9 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M17 9v6M20 9v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const MiniPlayerIcon = createIcon('MiniPlayerIcon',
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M10 10l4 2-4 2V10z" fill="currentColor" />
  </>,
);

export const MultiscreenIcon = createIcon('MultiscreenIcon',
  <>
    <rect x="2" y="4" width="14" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="8" y="8" width="14" height="12" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
  </>,
);

export const PauseIcon = createIcon('PauseIcon',
  <>
    <path d="M8 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const PlayIcon = createIcon('PlayIcon',
  <path d="M7 4l10 8-10 8V4z" fill="currentColor" />,
);

export const StopCircleIcon = createIcon('StopCircleIcon',
  <>
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
  </>,
);

export const TranscriptIcon = createIcon('TranscriptIcon',
  <>
    <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 17h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const VideoOffIcon = createIcon('VideoOffIcon',
  <>
    <rect x="3" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M19 8l-4 3 4 3V8z" fill="currentColor" />
    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const VideoOnIcon = createIcon('VideoOnIcon',
  <>
    <rect x="3" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M19 8l-4 3 4 3V8z" fill="currentColor" />
  </>,
);

export const VideoUnavailableIcon = createIcon('VideoUnavailableIcon',
  <>
    <rect x="3" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M19 8l-4 3 4 3V8z" fill="currentColor" />
    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const VideoCameraOffIcon = createIcon('VideoCameraOffIcon',
  <>
    <path d="M4 7h10l3-3v16l-3-3H4V7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const VideoCameraOnIcon = createIcon('VideoCameraOnIcon',
  <path d="M4 7h10l3-3v16l-3-3H4V7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
);
