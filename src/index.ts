// Kiln design system — v0.1.0

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
