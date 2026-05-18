// Kiln design system — v0.1.0
import './styles/design-tokens.css';

// Icons
export type { IconProps } from './icons/types';
export * from './icons/navigation';
export * from './icons/status';
export * from './icons/actions';
export * from './icons/content';
export * from './icons/social';
export * from './icons/misc';
export * from './icons/theme';
export * from './icons/communication';
export * from './icons/media';
export * from './icons/ui';

// Utilities
export { cn, Slot } from './utils';
export type { SlotProps, PolymorphicProps, PolymorphicPropsWithRef } from './utils';

// Accordion
export { default as Accordion } from './components/Accordion';
export type { AccordionProps, AccordionItem } from './components/Accordion';


// Lifted primitives
export { default as Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { default as LoadingIndicator } from './components/LoadingIndicator';
export type { LoadingIndicatorProps } from './components/LoadingIndicator';

export { default as ErrorMessage } from './components/ErrorMessage';
export type { ErrorMessageProps } from './components/ErrorMessage';

export { default as ThemeToggle } from './components/ThemeToggle';
export type { ThemeToggleProps, KilnTheme } from './components/ThemeToggle';

export { default as Nav } from './components/Nav';
export type { NavProps, NavItem as NavBarItem } from './components/Nav';

export { default as NavMenu } from './components/NavMenu';
export type { NavMenuProps, NavItem } from './components/NavMenu';

export { default as MobileNav } from './components/MobileNav';
export type { MobileNavProps, MobileNavItem } from './components/MobileNav';

export { default as Footer } from './components/Footer';
export type { FooterProps, FooterLink } from './components/Footer';

export { default as ScrollToTop } from './components/ScrollToTop';
export type { ScrollToTopProps } from './components/ScrollToTop';

// New primitives
export { default as Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { default as Input } from './components/Input';
export type { InputProps, InputVariant } from './components/Input';

export { default as Textarea } from './components/Textarea';
export type { TextareaProps, TextareaVariant } from './components/Textarea';

export { default as Card } from './components/Card';
export type { CardProps, CardVariant } from './components/Card';

export { default as Badge } from './components/Badge';
export type { BadgeProps, BadgeVariant, BadgeSeverity, BadgeStatus, BadgeSize } from './components/Badge';

export { default as Chip } from './components/Chip';
export type { ChipProps } from './components/Chip';

export { default as Toggle } from './components/Toggle';
export type { ToggleProps, ToggleSize } from './components/Toggle';

export { default as Tabs } from './components/Tabs';
export type { TabsProps, TabItem, TabsVariant } from './components/Tabs';

export { default as CodeBlock } from './components/CodeBlock';
export type { CodeBlockProps } from './components/CodeBlock';

export { toast, ToastContainer } from './components/Toast';
export type { ToastOptions, ToastVariant, ToastItem, ToastContainerProps, ToastPosition } from './components/Toast';

export { default as Tooltip } from './components/Tooltip';
export type { TooltipProps, TooltipSide } from './components/Tooltip';

export { default as DropdownMenu } from './components/DropdownMenu';
export type {
  DropdownMenuProps,
  DropdownMenuEntry,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuAlign,
  DropdownMenuSide,
} from './components/DropdownMenu';

export { default as TableOfContents } from './components/TableOfContents';
export type { TableOfContentsProps, TocItem } from './components/TableOfContents';

export { default as SideNav } from './components/SideNav';
export type { SideNavProps, SideNavItem, SideNavGroup } from './components/SideNav';

export { default as Grid } from './components/Grid';
export type { GridProps, GridCols, GridGap } from './components/Grid';

export { GridItem } from './components/Grid';
export type { GridItemProps } from './components/Grid';

export { AppLayout } from './components/AppLayout';
export type { AppLayoutProps, AppLayoutBreadcrumb, AppLayoutNotification } from './components/AppLayout';

export { Breadcrumbs } from './components/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './components/Breadcrumbs';

export { NotificationBar } from './components/NotificationBar';
export type { NotificationBarProps, NotificationBarItem, NotificationBarType } from './components/NotificationBar';

export { default as RadioButton } from './components/RadioButton';
export type { RadioButtonProps } from './components/RadioButton';

export { ToolsPanel } from './components/ToolsPanel';
export type { ToolsPanelProps } from './components/ToolsPanel';

export { SplitPanel } from './components/SplitPanel';
export type { SplitPanelProps } from './components/SplitPanel';

export { default as Header } from './components/Header';
export type { HeaderProps, HeaderVariant } from './components/Header';

export { Hero } from './components/Hero';
export type { HeroProps, HeroVariant, HeroSize, HeroAlign } from './components/Hero';

export { default as List } from './components/List';
export type { ListProps, KilnListItem } from './components/List';

export { default as Table } from './components/Table';
export type {
  TableProps,
  TableColumnDefinition,
  TableSortingState,
  TableSelectionType,
  TableVariant,
  TableContentDensity,
  TableAriaLabels,
} from './components/Table';

export { CopyToClipboard } from './components/CopyToClipboard';
export type { CopyToClipboardProps, CopyStatus, CopyPlacement } from './components/CopyToClipboard';

export { Blockquote } from './components/Blockquote';
export type { BlockquoteProps, BlockquoteVariant } from './components/Blockquote';

export { GradientText } from './components/GradientText';
export type { GradientTextProps, GradientTextVariant, GradientTextAs } from './components/GradientText';

export { ScrollIndicator } from './components/ScrollIndicator';
export type { ScrollIndicatorProps, ScrollIndicatorVariant } from './components/ScrollIndicator';

export { Section } from './components/Section';
export type { SectionProps, SectionBackground } from './components/Section';

export { Prose } from './components/Prose';
export type { ProseProps, ProseSize } from './components/Prose';

export { default as Avatar } from './components/Avatar';
export type { AvatarProps, AvatarSize } from './components/Avatar';

export { default as Checkbox } from './components/Checkbox';
export type { CheckboxProps, CheckboxSize } from './components/Checkbox';
