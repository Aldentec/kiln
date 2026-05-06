import React, { useState, useMemo, useCallback } from 'react';
import {
  AppLayout,
  Nav,
  Table,
  Input,
  Badge,
  type TableColumnDefinition,
  SearchIcon,
  XIcon,
} from '@doriansmith/kiln';
import {
  NAV_ITEMS,
  NAV_LOGO,
  isNavActive,
  navigate,
  NavActions,
} from './nav';

import {
  // Navigation
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MenuIcon,
  AngleUpIcon,
  AngleDownIcon,
  AngleLeftIcon,
  AngleRightIcon,
  // Status
  CheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
  WarningIcon,
  StatusPositiveIcon,
  StatusNegativeIcon,
  StatusInfoIcon,
  StatusWarningIcon,
  StatusInProgressIcon,
  StatusPendingIcon,
  StatusStoppedIcon,
  StatusNotStartedIcon,
  // Actions
  PlusIcon,
  MinusIcon,
  TrashIcon,
  PencilIcon,
  ExternalLinkIcon,
  CopyIcon,
  SettingsIcon,
  EyeIcon,
  EyeOffIcon,
  UploadIcon,
  DownloadIcon,
  FilterIcon,
  SortIcon,
  AnchorLinkIcon,
  CalendarIcon,
  CommandPromptIcon,
  DeleteMarkerIcon,
  DotIcon,
  EditGenAiIcon,
  EllipsisIcon,
  FlagIcon,
  GenAiIcon,
  HistoryIcon,
  RefreshIcon,
  RemoveIcon,
  RedoIcon,
  ScriptIcon,
  SearchGenAiIcon,
  SendIcon,
  ShareIcon,
  SlashIcon,
  SubtractMinusIcon,
  SuggestionsIcon,
  TicketIcon,
  UndoIcon,
  UnlockedIcon,
  UploadDownloadIcon,
  // Content
  FileIcon,
  FolderIcon,
  ImageIcon,
  CodeIcon,
  TerminalIcon,
  LinkIcon,
  BookmarkIcon,
  TagIcon,
  FileOpenIcon,
  FolderOpenIcon,
  // Social
  UserIcon,
  UsersIcon,
  BellIcon,
  StarIcon,
  StarFilledIcon,
  HeartIcon,
  FaceSmileIcon,
  FaceNeutralIcon,
  FaceFrownIcon,
  GroupIcon,
  HeartFilledIcon,
  StarHalfIcon,
  UserProfileIcon,
  // Miscellaneous
  DragHandleIcon,
  ShieldIcon,
  ZapIcon,
  SmartphoneIcon,
  GridIcon,
  ListIcon,
  KeyIcon,
  KeyboardIcon,
  LocationPinIcon,
  MapIcon,
  PaletteIcon,
  TypeIcon,
  RulerIcon,
  LayersIcon,
  CornerRadiusIcon,
  PaintBucketIcon,
  // Theme
  SunIcon,
  MoonIcon,
  LightDarkIcon,
  // Communication
  CallIcon,
  ContactIcon,
  EnvelopeIcon,
  GlobeIcon,
  BugIcon,
  LockPrivateIcon,
  SecurityIcon,
  MicrophoneIcon,
  MicrophoneOffIcon,
  // Media
  AudioFullIcon,
  AudioHalfIcon,
  AudioOffIcon,
  Backward10SecondsIcon,
  Forward10SecondsIcon,
  ClosedCaptionIcon,
  ClosedCaptionUnavailableIcon,
  MiniPlayerIcon,
  MultiscreenIcon,
  PauseIcon,
  PlayIcon,
  StopCircleIcon,
  TranscriptIcon,
  VideoOffIcon,
  VideoOnIcon,
  VideoUnavailableIcon,
  VideoCameraOffIcon,
  VideoCameraOnIcon,
  // UI
  CaretDownFilledIcon,
  CaretDownIcon,
  CaretLeftFilledIcon,
  CaretRightFilledIcon,
  CaretUpFilledIcon,
  CaretUpIcon,
  ExpandIcon,
  ShrinkIcon,
  FullScreenIcon,
  ExitFullScreenIcon,
  TreeviewCollapseIcon,
  TreeviewExpandIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ZoomToFitIcon,
  ResizeAreaIcon,
  ViewFullIcon,
  ViewHorizontalIcon,
  ViewVerticalIcon,
  InsertRowIcon,
  GridViewIcon,
  ListViewIcon,
} from '@doriansmith/kiln';

// ── Icon data with descriptions ──────────────────────────────────────────────

interface IconData {
  name: string;
  component: React.ComponentType<{ size?: number }>;
  type: string;
  description: string;
}

const ICONS: IconData[] = [
  // Navigation
  { name: 'ChevronDown', component: ChevronDownIcon, type: 'Navigation', description: 'Indicates a collapsible section or dropdown menu.' },
  { name: 'ChevronUp', component: ChevronUpIcon, type: 'Navigation', description: 'Indicates an expandable section or scroll to top.' },
  { name: 'ChevronRight', component: ChevronRightIcon, type: 'Navigation', description: 'Indicates forward navigation or a submenu.' },
  { name: 'ChevronLeft', component: ChevronLeftIcon, type: 'Navigation', description: 'Indicates backward navigation or return.' },
  { name: 'ArrowRight', component: ArrowRightIcon, type: 'Navigation', description: 'Directs attention or navigation to the right.' },
  { name: 'ArrowLeft', component: ArrowLeftIcon, type: 'Navigation', description: 'Directs attention or navigation to the left.' },
  { name: 'ArrowUp', component: ArrowUpIcon, type: 'Navigation', description: 'Indicates upward movement or priority.' },
  { name: 'ArrowDown', component: ArrowDownIcon, type: 'Navigation', description: 'Indicates downward movement or a download.' },
  { name: 'Menu', component: MenuIcon, type: 'Navigation', description: 'Opens a navigation drawer or menu.' },
  { name: 'AngleUp', component: AngleUpIcon, type: 'Navigation', description: 'Indicates upward direction or sorting.' },
  { name: 'AngleDown', component: AngleDownIcon, type: 'Navigation', description: 'Indicates downward direction or sorting.' },
  { name: 'AngleLeft', component: AngleLeftIcon, type: 'Navigation', description: 'Indicates left direction or previous page.' },
  { name: 'AngleRight', component: AngleRightIcon, type: 'Navigation', description: 'Indicates right direction or next page.' },
  // Status
  { name: 'Check', component: CheckIcon, type: 'Status', description: 'Indicates a completed or confirmed action.' },
  { name: 'CheckCircle', component: CheckCircleIcon, type: 'Status', description: 'Indicates a successful or verified state.' },
  { name: 'X', component: XIcon, type: 'Status', description: 'Indicates a closed, cancelled, or error state.' },
  { name: 'XCircle', component: XCircleIcon, type: 'Status', description: 'Indicates an error or invalid state.' },
  { name: 'Info', component: InfoIcon, type: 'Status', description: 'Provides additional information or guidance.' },
  { name: 'Warning', component: WarningIcon, type: 'Status', description: 'Alerts the user to a potential issue.' },
  { name: 'StatusPositive', component: StatusPositiveIcon, type: 'Status', description: 'Represents a positive or healthy status.' },
  { name: 'StatusNegative', component: StatusNegativeIcon, type: 'Status', description: 'Represents a negative or failing status.' },
  { name: 'StatusInfo', component: StatusInfoIcon, type: 'Status', description: 'Represents an informational status.' },
  { name: 'StatusWarning', component: StatusWarningIcon, type: 'Status', description: 'Represents a warning status.' },
  { name: 'StatusInProgress', component: StatusInProgressIcon, type: 'Status', description: 'Represents an ongoing or active process.' },
  { name: 'StatusPending', component: StatusPendingIcon, type: 'Status', description: 'Represents a waiting or pending state.' },
  { name: 'StatusStopped', component: StatusStoppedIcon, type: 'Status', description: 'Represents a stopped or halted process.' },
  { name: 'StatusNotStarted', component: StatusNotStartedIcon, type: 'Status', description: 'Represents a not yet initiated state.' },
  // Actions
  { name: 'Plus', component: PlusIcon, type: 'Actions', description: 'Use to add an element in-line.' },
  { name: 'Minus', component: MinusIcon, type: 'Actions', description: 'Use to remove or reduce an element.' },
  { name: 'Trash', component: TrashIcon, type: 'Actions', description: 'Use to delete or remove an item permanently.' },
  { name: 'Pencil', component: PencilIcon, type: 'Actions', description: 'Use to edit or modify existing content.' },
  { name: 'Search', component: SearchIcon, type: 'Actions', description: 'Use to search or filter content.' },
  { name: 'ExternalLink', component: ExternalLinkIcon, type: 'Actions', description: 'Indicates a link that opens in a new context.' },
  { name: 'Copy', component: CopyIcon, type: 'Actions', description: 'Use to duplicate content to the clipboard.' },
  { name: 'Settings', component: SettingsIcon, type: 'Actions', description: 'Opens configuration or preferences.' },
  { name: 'Eye', component: EyeIcon, type: 'Actions', description: 'Toggles visibility of content or a password.' },
  { name: 'EyeOff', component: EyeOffIcon, type: 'Actions', description: 'Indicates content is hidden or invisible.' },
  { name: 'Upload', component: UploadIcon, type: 'Actions', description: 'Use to upload files or data.' },
  { name: 'Download', component: DownloadIcon, type: 'Actions', description: 'Use to download files or data.' },
  { name: 'Filter', component: FilterIcon, type: 'Actions', description: 'Use to narrow down displayed results.' },
  { name: 'Sort', component: SortIcon, type: 'Actions', description: 'Use to reorder items by a criterion.' },
  { name: 'AnchorLink', component: AnchorLinkIcon, type: 'Actions', description: 'Use to represent linking to a specific content element.' },
  { name: 'Calendar', component: CalendarIcon, type: 'Actions', description: 'Use to select or display a date.' },
  { name: 'CommandPrompt', component: CommandPromptIcon, type: 'Actions', description: 'Represents a command line or terminal interface.' },
  { name: 'DeleteMarker', component: DeleteMarkerIcon, type: 'Actions', description: 'Use to mark an item for deletion.' },
  { name: 'Dot', component: DotIcon, type: 'Actions', description: 'Use as a bullet point or status indicator.' },
  { name: 'EditGenAi', component: EditGenAiIcon, type: 'Actions', description: 'Use to edit content with generative AI assistance.' },
  { name: 'Ellipsis', component: EllipsisIcon, type: 'Actions', description: 'Opens a menu of additional actions.' },
  { name: 'Flag', component: FlagIcon, type: 'Actions', description: 'Use to flag or report content.' },
  { name: 'GenAi', component: GenAiIcon, type: 'Actions', description: 'Represents generative AI functionality.' },
  { name: 'History', component: HistoryIcon, type: 'Actions', description: 'Use to view past actions or changes.' },
  { name: 'Refresh', component: RefreshIcon, type: 'Actions', description: 'Use to reload or refresh content.' },
  { name: 'Remove', component: RemoveIcon, type: 'Actions', description: 'Use to remove an item from a list.' },
  { name: 'Redo', component: RedoIcon, type: 'Actions', description: 'Use to reapply a previously undone action.' },
  { name: 'Script', component: ScriptIcon, type: 'Actions', description: 'Represents a script or automation.' },
  { name: 'SearchGenAi', component: SearchGenAiIcon, type: 'Actions', description: 'Use to search with AI-powered results.' },
  { name: 'Send', component: SendIcon, type: 'Actions', description: 'Use to send a message or submission.' },
  { name: 'Share', component: ShareIcon, type: 'Actions', description: 'Use to share content with others.' },
  { name: 'Slash', component: SlashIcon, type: 'Actions', description: 'Represents a command prompt or slash command.' },
  { name: 'SubtractMinus', component: SubtractMinusIcon, type: 'Actions', description: 'Use to subtract or decrease a value.' },
  { name: 'Suggestions', component: SuggestionsIcon, type: 'Actions', description: 'Provides suggested actions or completions.' },
  { name: 'Ticket', component: TicketIcon, type: 'Actions', description: 'Represents a support ticket or task.' },
  { name: 'Undo', component: UndoIcon, type: 'Actions', description: 'Use to revert the last action.' },
  { name: 'Unlocked', component: UnlockedIcon, type: 'Actions', description: 'Indicates unlocked or accessible content.' },
  { name: 'UploadDownload', component: UploadDownloadIcon, type: 'Actions', description: 'Represents bidirectional data transfer.' },
  // Content
  { name: 'File', component: FileIcon, type: 'Content', description: 'Represents a file or document.' },
  { name: 'Folder', component: FolderIcon, type: 'Content', description: 'Represents a folder or directory.' },
  { name: 'Image', component: ImageIcon, type: 'Content', description: 'Represents an image or photo.' },
  { name: 'Code', component: CodeIcon, type: 'Content', description: 'Represents code or a code snippet.' },
  { name: 'Terminal', component: TerminalIcon, type: 'Content', description: 'Represents a terminal or console.' },
  { name: 'Link', component: LinkIcon, type: 'Content', description: 'Represents a hyperlink or connection.' },
  { name: 'Bookmark', component: BookmarkIcon, type: 'Content', description: 'Use to save or bookmark content.' },
  { name: 'Tag', component: TagIcon, type: 'Content', description: 'Use to label or categorize content.' },
  { name: 'FileOpen', component: FileOpenIcon, type: 'Content', description: 'Represents an opened file.' },
  { name: 'FolderOpen', component: FolderOpenIcon, type: 'Content', description: 'Represents an opened folder.' },
  // Social
  { name: 'User', component: UserIcon, type: 'Social', description: 'Represents a single user or profile.' },
  { name: 'Users', component: UsersIcon, type: 'Social', description: 'Represents multiple users or a team.' },
  { name: 'Bell', component: BellIcon, type: 'Social', description: 'Represents notifications or alerts.' },
  { name: 'Star', component: StarIcon, type: 'Social', description: 'Use to rate or favorite content.' },
  { name: 'StarFilled', component: StarFilledIcon, type: 'Social', description: 'Indicates a filled or active rating.' },
  { name: 'StarHalf', component: StarHalfIcon, type: 'Social', description: 'Indicates a half-filled rating.' },
  { name: 'Heart', component: HeartIcon, type: 'Social', description: 'Represents a like or favorite.' },
  { name: 'FaceSmile', component: FaceSmileIcon, type: 'Social', description: 'Represents positive feedback or satisfaction.' },
  { name: 'FaceNeutral', component: FaceNeutralIcon, type: 'Social', description: 'Represents neutral feedback.' },
  { name: 'FaceFrown', component: FaceFrownIcon, type: 'Social', description: 'Represents negative feedback.' },
  { name: 'Group', component: GroupIcon, type: 'Social', description: 'Represents a group or community.' },
  { name: 'HeartFilled', component: HeartFilledIcon, type: 'Social', description: 'Indicates an active like or favorite.' },
  { name: 'UserProfile', component: UserProfileIcon, type: 'Social', description: 'Represents a user profile card.' },
  // Miscellaneous
  { name: 'DragHandle', component: DragHandleIcon, type: 'Miscellaneous', description: 'Indicates a draggable element.' },
  { name: 'Shield', component: ShieldIcon, type: 'Miscellaneous', description: 'Represents security or protection.' },
  { name: 'Zap', component: ZapIcon, type: 'Miscellaneous', description: 'Represents speed or power.' },
  { name: 'Smartphone', component: SmartphoneIcon, type: 'Miscellaneous', description: 'Represents a mobile device.' },
  { name: 'Grid', component: GridIcon, type: 'Miscellaneous', description: 'Represents a grid layout view.' },
  { name: 'List', component: ListIcon, type: 'Miscellaneous', description: 'Represents a list layout view.' },
  { name: 'Key', component: KeyIcon, type: 'Miscellaneous', description: 'Represents authentication or access.' },
  { name: 'Keyboard', component: KeyboardIcon, type: 'Miscellaneous', description: 'Represents keyboard input.' },
  { name: 'LocationPin', component: LocationPinIcon, type: 'Miscellaneous', description: 'Represents a geographic location.' },
  { name: 'Map', component: MapIcon, type: 'Miscellaneous', description: 'Represents a map or directions.' },
  { name: 'Palette', component: PaletteIcon, type: 'Miscellaneous', description: 'Represents color, theming, or design tools.' },
  { name: 'Type', component: TypeIcon, type: 'Miscellaneous', description: 'Represents typography or text formatting.' },
  { name: 'Ruler', component: RulerIcon, type: 'Miscellaneous', description: 'Represents measurement or spacing.' },
  { name: 'Layers', component: LayersIcon, type: 'Miscellaneous', description: 'Represents stacked layers or elevation.' },
  { name: 'CornerRadius', component: CornerRadiusIcon, type: 'Miscellaneous', description: 'Represents border radius or rounded corners.' },
  { name: 'PaintBucket', component: PaintBucketIcon, type: 'Miscellaneous', description: 'Represents fill color or paint tools.' },
  // Theme
  { name: 'Sun', component: SunIcon, type: 'Theme', description: 'Represents light mode or brightness.' },
  { name: 'Moon', component: MoonIcon, type: 'Theme', description: 'Represents dark mode.' },
  { name: 'LightDark', component: LightDarkIcon, type: 'Theme', description: 'Toggles between light and dark themes.' },
  // Communication
  { name: 'Call', component: CallIcon, type: 'Communication', description: 'Represents a phone call.' },
  { name: 'Contact', component: ContactIcon, type: 'Communication', description: 'Represents a contact or address book.' },
  { name: 'Envelope', component: EnvelopeIcon, type: 'Communication', description: 'Represents an email or message.' },
  { name: 'Globe', component: GlobeIcon, type: 'Communication', description: 'Represents the internet or global access.' },
  { name: 'Bug', component: BugIcon, type: 'Communication', description: 'Represents a bug or issue report.' },
  { name: 'LockPrivate', component: LockPrivateIcon, type: 'Communication', description: 'Represents privacy or a locked state.' },
  { name: 'Security', component: SecurityIcon, type: 'Communication', description: 'Represents security or verification.' },
  { name: 'Microphone', component: MicrophoneIcon, type: 'Communication', description: 'Represents audio input or voice.' },
  { name: 'MicrophoneOff', component: MicrophoneOffIcon, type: 'Communication', description: 'Indicates microphone is muted.' },
  // Media
  { name: 'AudioFull', component: AudioFullIcon, type: 'Media', description: 'Represents full audio volume.' },
  { name: 'AudioHalf', component: AudioHalfIcon, type: 'Media', description: 'Represents medium audio volume.' },
  { name: 'AudioOff', component: AudioOffIcon, type: 'Media', description: 'Indicates audio is muted.' },
  { name: 'Backward10Seconds', component: Backward10SecondsIcon, type: 'Media', description: 'Skips backward 10 seconds.' },
  { name: 'Forward10Seconds', component: Forward10SecondsIcon, type: 'Media', description: 'Skips forward 10 seconds.' },
  { name: 'ClosedCaption', component: ClosedCaptionIcon, type: 'Media', description: 'Toggles closed captions.' },
  { name: 'ClosedCaptionUnavailable', component: ClosedCaptionUnavailableIcon, type: 'Media', description: 'Indicates captions are unavailable.' },
  { name: 'MiniPlayer', component: MiniPlayerIcon, type: 'Media', description: 'Represents a mini player mode.' },
  { name: 'Multiscreen', component: MultiscreenIcon, type: 'Media', description: 'Represents multi-screen or picture-in-picture.' },
  { name: 'Pause', component: PauseIcon, type: 'Media', description: 'Pauses media playback.' },
  { name: 'Play', component: PlayIcon, type: 'Media', description: 'Starts media playback.' },
  { name: 'StopCircle', component: StopCircleIcon, type: 'Media', description: 'Stops media playback.' },
  { name: 'Transcript', component: TranscriptIcon, type: 'Media', description: 'Represents a transcript or subtitle file.' },
  { name: 'VideoOff', component: VideoOffIcon, type: 'Media', description: 'Indicates video is disabled.' },
  { name: 'VideoOn', component: VideoOnIcon, type: 'Media', description: 'Indicates video is enabled.' },
  { name: 'VideoUnavailable', component: VideoUnavailableIcon, type: 'Media', description: 'Indicates video is not available.' },
  { name: 'VideoCameraOff', component: VideoCameraOffIcon, type: 'Media', description: 'Indicates camera is off.' },
  { name: 'VideoCameraOn', component: VideoCameraOnIcon, type: 'Media', description: 'Indicates camera is on.' },
  // UI
  { name: 'CaretDownFilled', component: CaretDownFilledIcon, type: 'UI', description: 'Indicates a dropdown or expandable section.' },
  { name: 'CaretDown', component: CaretDownIcon, type: 'UI', description: 'Indicates a dropdown or expandable section.' },
  { name: 'CaretLeftFilled', component: CaretLeftFilledIcon, type: 'UI', description: 'Indicates leftward navigation.' },
  { name: 'CaretRightFilled', component: CaretRightFilledIcon, type: 'UI', description: 'Indicates rightward navigation.' },
  { name: 'CaretUpFilled', component: CaretUpFilledIcon, type: 'UI', description: 'Indicates upward navigation.' },
  { name: 'CaretUp', component: CaretUpIcon, type: 'UI', description: 'Indicates upward navigation.' },
  { name: 'Expand', component: ExpandIcon, type: 'UI', description: 'Expands an element to full size.' },
  { name: 'Shrink', component: ShrinkIcon, type: 'UI', description: 'Shrinks an element from full size.' },
  { name: 'FullScreen', component: FullScreenIcon, type: 'UI', description: 'Enters full-screen mode.' },
  { name: 'ExitFullScreen', component: ExitFullScreenIcon, type: 'UI', description: 'Exits full-screen mode.' },
  { name: 'TreeviewCollapse', component: TreeviewCollapseIcon, type: 'UI', description: 'Collapses a tree view node.' },
  { name: 'TreeviewExpand', component: TreeviewExpandIcon, type: 'UI', description: 'Expands a tree view node.' },
  { name: 'ZoomIn', component: ZoomInIcon, type: 'UI', description: 'Zooms in on content.' },
  { name: 'ZoomOut', component: ZoomOutIcon, type: 'UI', description: 'Zooms out on content.' },
  { name: 'ZoomToFit', component: ZoomToFitIcon, type: 'UI', description: 'Zooms content to fit the viewport.' },
  { name: 'ResizeArea', component: ResizeAreaIcon, type: 'UI', description: 'Indicates a resizable area.' },
  { name: 'ViewFull', component: ViewFullIcon, type: 'UI', description: 'Represents a full view layout.' },
  { name: 'ViewHorizontal', component: ViewHorizontalIcon, type: 'UI', description: 'Represents a horizontal split layout.' },
  { name: 'ViewVertical', component: ViewVerticalIcon, type: 'UI', description: 'Represents a vertical split layout.' },
  { name: 'InsertRow', component: InsertRowIcon, type: 'UI', description: 'Use to insert a new row in a table.' },
  { name: 'GridView', component: GridViewIcon, type: 'UI', description: 'Switches to a grid layout view.' },
  { name: 'ListView', component: ListViewIcon, type: 'UI', description: 'Switches to a list layout view.' },
];

const TOTAL_ICONS = ICONS.length;

export default function IconLibraryPage() {
  const [query, setQuery] = React.useState('');
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const normalised = query.trim().toLowerCase();

  const filteredIcons = useMemo(
    () =>
      normalised
        ? ICONS.filter((icon) => icon.name.toLowerCase().includes(normalised))
        : ICONS,
    [normalised],
  );

  const handleRowClick = useCallback((item: IconData) => {
    const code = `<${item.name}Icon />`;
    navigator.clipboard.writeText(code).then(() => {
      setCopiedName(item.name);
      setTimeout(() => setCopiedName(null), 2000);
    });
  }, []);

  const columns: TableColumnDefinition<IconData>[] = [
    {
      id: 'icon',
      header: 'Icon',
      cell: (item) => <item.component size={20} />,
      width: 60,
      minWidth: 60,
    },
    {
      id: 'name',
      header: 'Name',
      cell: (item) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-2)' }}>
          {item.name}
          {copiedName === item.name && (
            <Badge variant="success" size="sm">Copied!</Badge>
          )}
        </span>
      ),
      sortingField: 'name',
      isRowHeader: true,
      minWidth: 160,
    },
    {
      id: 'type',
      header: 'Type',
      cell: (item) => item.type,
      sortingField: 'type',
      width: 120,
      minWidth: 100,
    },
    {
      id: 'description',
      header: 'Description',
      cell: (item) => item.description,
      minWidth: 200,
    },
  ];

  return (
    <AppLayout
      topBar={
        <Nav
          logo={NAV_LOGO}
          items={NAV_ITEMS}
          isActive={isNavActive}
          actions={<NavActions />}
          sticky
          onNavigate={navigate}
        />
      }
      contentLabel="Icon Library"
    >
      <div style={{ padding: 'var(--kiln-space-6)' }}>
        <Table
          columnDefinitions={columns}
          items={filteredIcons}
          trackBy="name"
          variant="container"
          contentDensity="comfortable"
          ariaLabel="Available icons"
          header={
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--kiln-space-3)', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 'var(--kiln-text-xl)', fontWeight: 700, margin: 0 }}>
                Available icons{' '}
                <span style={{ color: 'var(--kiln-gray-400)', fontWeight: 400 }}>
                  ({normalised ? filteredIcons.length : TOTAL_ICONS})
                </span>
              </h1>
              <span style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-1)' }}>
                <CopyIcon size={12} />
                Click any row to copy
              </span>
            </div>
          }
          filter={
            <Input
              type="search"
              placeholder="Find icons…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search icons"
              leftIcon={<SearchIcon size={16} />}
              rightIcon={query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    border: 'none',
                    borderRadius: '50%',
                    background: 'var(--kiln-gray-200)',
                    color: 'var(--kiln-gray-500)',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <XIcon size={12} />
                </button>
              ) : undefined}
              containerClassName="kiln-icons-search"
            />
          }
          empty={
            <div style={{ textAlign: 'center', padding: 'var(--kiln-space-12) 0', color: 'var(--kiln-gray-400)' }}>
              <SearchIcon size={32} style={{ marginBottom: 'var(--kiln-space-2)', opacity: 0.4 }} />
              <p style={{ fontSize: 'var(--kiln-text-sm)', margin: 0 }}>
                No icons found for <strong>"{query}"</strong>
              </p>
            </div>
          }
          footer={
            <div style={{ padding: 'var(--kiln-space-3) var(--kiln-space-4)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
              {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''}
              {normalised ? ` matching "${query}"` : ' total'}
            </div>
          }
          onRowClick={({ item }) => handleRowClick(item)}
        />
      </div>
    </AppLayout>
  );
}
