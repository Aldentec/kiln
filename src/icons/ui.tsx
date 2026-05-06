import { createIcon } from './base';

export const CaretDownFilledIcon = createIcon('CaretDownFilledIcon',
  <path d="M4.5 7.5l7.5 7.5 7.5-7.5h-15z" />,
);

export const CaretDownIcon = createIcon('CaretDownIcon',
  <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />,
);

export const CaretLeftFilledIcon = createIcon('CaretLeftFilledIcon',
  <path d="M16.5 4.5L9 12l7.5 7.5v-15z" />,
);

export const CaretRightFilledIcon = createIcon('CaretRightFilledIcon',
  <path d="M7.5 4.5L15 12l-7.5 7.5v-15z" />,
);

export const CaretUpFilledIcon = createIcon('CaretUpFilledIcon',
  <path d="M4.5 16.5l7.5-7.5 7.5 7.5h-15z" />,
);

export const CaretUpIcon = createIcon('CaretUpIcon',
  <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 15l6-6 6 6" />,
);

export const ExpandIcon = createIcon('ExpandIcon',
  <>
    <path d="M4 9V4h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 9V4h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </>,
);

export const ShrinkIcon = createIcon('ShrinkIcon',
  <>
    <path d="M9 4v5H4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 4v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 20v-5H4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 20v-5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </>,
);

export const FullScreenIcon = createIcon('FullScreenIcon',
  <>
    <path d="M4 9V4h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 9V4h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="8" y="8" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
  </>,
);

export const ExitFullScreenIcon = createIcon('ExitFullScreenIcon',
  <>
    <path d="M9 4v5H4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 4v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 20v-5H4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 20v-5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </>,
);

export const TreeviewCollapseIcon = createIcon('TreeviewCollapseIcon',
  <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />,
);

export const TreeviewExpandIcon = createIcon('TreeviewExpandIcon',
  <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />,
);

export const ZoomInIcon = createIcon('ZoomInIcon',
  <>
    <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M10 7v6M7 10h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M14.5 14.5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const ZoomOutIcon = createIcon('ZoomOutIcon',
  <>
    <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M7 10h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M14.5 14.5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const ZoomToFitIcon = createIcon('ZoomToFitIcon',
  <>
    <path d="M4 9V4h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 9V4h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15v5h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 15v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="9" y="9" width="6" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
  </>,
);

export const ResizeAreaIcon = createIcon('ResizeAreaIcon',
  <>
    <rect x="5" y="5" width="14" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M17 7l-3 3M17 10h-3v-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 17l3-3M7 14v3h3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </>,
);

export const ViewFullIcon = createIcon('ViewFullIcon',
  <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />,
);

export const ViewHorizontalIcon = createIcon('ViewHorizontalIcon',
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M12 4v16" stroke="currentColor" strokeWidth="2" />
  </>,
);

export const ViewVerticalIcon = createIcon('ViewVerticalIcon',
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M4 12h16" stroke="currentColor" strokeWidth="2" />
  </>,
);

export const InsertRowIcon = createIcon('InsertRowIcon',
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M4 10h16M4 14h16" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7v3M10 8.5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);

export const GridViewIcon = createIcon('GridViewIcon',
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" />
  </>,
);

export const ListViewIcon = createIcon('ListViewIcon',
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M8 9h8M8 12h8M8 15h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </>,
);
