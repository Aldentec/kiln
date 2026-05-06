import React, { useState } from 'react';
import {
  Card, Badge, Button, Chip, Input, Textarea, Modal, Accordion,
  RadioButton, DropdownMenu, toast, ToastContainer, Tooltip,
  BugIcon, ZapIcon, CheckCircleIcon, StatusInProgressIcon, StatusPendingIcon,
  PlusIcon,
} from '@doriansmith/kiln';

// ─── Types ───────────────────────────────────────────────────────────────────

type TicketStatus   = 'open' | 'in-progress' | 'resolved';
type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  submittedAt: string;
  author: string;
  category: string;
  icon: React.ComponentType<{ size?: number }>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 't1', icon: BugIcon,
    title: 'Login page unresponsive on Safari 17',
    description: 'After the latest update, users on Safari 17 are unable to submit the login form. The button clicks but nothing happens. No console errors. Affects roughly 12% of our user base.',
    status: 'open', priority: 'critical',
    submittedAt: '5 min ago', author: 'Alex Chen', category: 'Bug',
  },
  {
    id: 't2', icon: BugIcon,
    title: 'Export to CSV missing last row',
    description: 'When exporting more than 1,000 records to CSV, the final row is always omitted. The preview shows all records correctly. Happens consistently across all browsers.',
    status: 'in-progress', priority: 'high',
    submittedAt: '1 hour ago', author: 'Maria Torres', category: 'Bug',
  },
  {
    id: 't3', icon: ZapIcon,
    title: 'Add keyboard shortcut for quick actions',
    description: 'It would be a significant productivity improvement to be able to trigger the quick-action panel using a keyboard shortcut (e.g. Cmd+K). Many power users have requested this.',
    status: 'open', priority: 'medium',
    submittedAt: '3 hours ago', author: 'Sam Okafor', category: 'Feature',
  },
  {
    id: 't4', icon: BugIcon,
    title: 'Dashboard charts not loading for EU region',
    description: 'Users in the EU region report that dashboard analytics charts show an indefinite loading state. API calls return 200 but the payload appears empty. Possibly a region-specific config issue.',
    status: 'open', priority: 'high',
    submittedAt: '6 hours ago', author: 'Lena Fischer', category: 'Bug',
  },
  {
    id: 't5',
    title: 'Dark mode color contrast fails on badge labels',
    description: 'In dark mode, the "warning" badge variant has insufficient color contrast between text and background. Fails WCAG AA 4.5:1 ratio. Reproduced in Chrome and Firefox.',
    status: 'resolved', priority: 'medium',
    submittedAt: '1 day ago', author: 'Jordan Park', category: 'Accessibility',
  },
  {
    id: 't6',
    title: 'Onboarding checklist missing localisation for Japanese',
    description: 'The onboarding checklist component is showing English strings even when the user locale is set to Japanese (ja-JP). All other parts of the UI are correctly localised.',
    status: 'resolved', priority: 'low',
    submittedAt: '2 days ago', author: 'Yuki Tanaka', category: 'i18n',
  },
];

const STATUS_CHIPS: { value: TicketStatus | 'all'; label: string }[] = [
  { value: 'all',         label: 'All'         },
  { value: 'open',        label: 'Open'        },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'resolved',    label: 'Resolved'    },
];

const STATUS_BADGE: Record<TicketStatus, 'warning' | 'running' | 'success'> = {
  'open':        'warning',
  'in-progress': 'running',
  'resolved':    'success',
};

const STATUS_LABEL: Record<TicketStatus, string> = {
  'open':        'Open',
  'in-progress': 'In Progress',
  'resolved':    'Resolved',
};

const PRIORITY_BADGE: Record<TicketPriority, 'critical' | 'high' | 'medium' | 'low'> = {
  critical: 'critical',
  high:     'high',
  medium:   'medium',
  low:      'low',
};

const FAQ_ITEMS = [
  {
    id: 'faq1',
    title: 'How do I submit a bug report?',
    content: 'Click "New Ticket", select a High or Critical priority, and describe the issue with steps to reproduce, expected behaviour, and actual behaviour. Include screenshots or logs where possible.',
  },
  {
    id: 'faq2',
    title: 'What is the SLA for critical issues?',
    content: 'Critical issues are acknowledged within 1 hour and targeted for resolution within 4 hours during business hours. High priority issues are acknowledged within 4 hours.',
  },
  {
    id: 'faq3',
    title: 'Can I attach files or screenshots?',
    content: 'File attachments are supported on Pro and Team plans. You can attach up to 5 files (10 MB each) per ticket. Supported formats: PNG, JPG, PDF, MP4, and plain text.',
  },
  {
    id: 'faq4',
    title: 'How do I check on the status of my ticket?',
    content: 'All your tickets appear on this page. Status updates are also sent via email if you have email notifications enabled in your account settings.',
  },
];

// ─── Priority badge color helper ────────────────────────────────────────────

const PRIORITY_OPTIONS: TicketPriority[] = ['low', 'medium', 'high', 'critical'];

const PRIORITY_DESC: Record<TicketPriority, string> = {
  low:      'Minor inconvenience, no data loss',
  medium:   'Degraded experience for some users',
  high:     'Major functionality impacted',
  critical: 'Service down or data loss risk',
};

// ─── DemoSupport ──────────────────────────────────────────────────────────────

export default function DemoSupport() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [newOpen, setNewOpen] = useState(false);
  const [selected, setSelected] = useState<Ticket | null>(null);

  // New ticket form state
  const [newTitle,    setNewTitle]    = useState('');
  const [newDesc,     setNewDesc]     = useState('');
  const [newPriority, setNewPriority] = useState<TicketPriority>('medium');

  const resetForm = () => { setNewTitle(''); setNewDesc(''); setNewPriority('medium'); };

  const submitTicket = () => {
    if (!newTitle.trim()) return;
    const ticket: Ticket = {
      id:          `t${Date.now()}`,
      title:       newTitle.trim(),
      description: newDesc.trim() || 'No description provided.',
      status:      'open',
      priority:    newPriority,
      submittedAt: 'just now',
      author:      'You',
      category:    'Bug',
    };
    setTickets(prev => [ticket, ...prev]);
    setNewOpen(false);
    resetForm();
    toast.success('Ticket submitted. We\'ll be in touch shortly.', { title: 'Ticket created' });
  };

  const updateStatus = (id: string, status: TicketStatus) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
    toast.info(`Ticket marked as ${STATUS_LABEL[status]}.`);
  };

  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.warning('Ticket deleted.');
  };

  const filtered = tickets.filter(t => {
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const openCount = tickets.filter(t => t.status === 'open').length;

  return (
    <Card variant="default" style={{ '--kiln-card-padding': '0', overflow: 'hidden' } as React.CSSProperties}>
      <ToastContainer position="bottom-right" />

      {/* ── Browser chrome ── */}
      <div style={{
        padding: 'var(--kiln-space-3) var(--kiln-space-4)',
        background: 'var(--kiln-gray-100)',
        borderBottom: '1px solid var(--kiln-gray-200)',
        display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-2)',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', flexShrink: 0 }} aria-hidden="true" />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', flexShrink: 0 }} aria-hidden="true" />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', flexShrink: 0 }} aria-hidden="true" />
        <span style={{
          flex: 1, maxWidth: 260, margin: '0 auto',
          background: 'var(--kiln-surface-raised)',
          borderRadius: 'var(--kiln-radius-sm)',
          padding: '3px var(--kiln-space-3)',
          fontSize: 'var(--kiln-text-xs)',
          color: 'var(--kiln-gray-500)',
          fontFamily: 'var(--kiln-font-mono)',
          textAlign: 'center',
        }}>
          kiln-demo.app/support
        </span>
      </div>

      <div style={{ padding: 'var(--kiln-space-5)' }}>
        {/* ── Page header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--kiln-space-3)', marginBottom: 'var(--kiln-space-5)' }}>
          <div>
            <h3 style={{ margin: '0 0 2px', fontSize: 'var(--kiln-text-lg)', fontWeight: 700, color: 'var(--kiln-gray-900)' }}>
              Support Center
            </h3>
            <p style={{ margin: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
              {openCount} open ticket{openCount === 1 ? '' : 's'}
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setNewOpen(true)}>
            + New Ticket
          </Button>
        </div>

        {/* ── Toolbar: search + status filters ── */}
        <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 'var(--kiln-space-4)' }}>
          <div style={{ flex: '1 1 200px' }}>
            <Input
              label="Search tickets"
              placeholder="Login, export, dashboard…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 'var(--kiln-space-2)', flexWrap: 'wrap', paddingBottom: 3 }}>
            {STATUS_CHIPS.map(c => (
              <Chip
                key={c.value}
                selected={statusFilter === c.value}
                onToggle={() => setStatusFilter(c.value)}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </div>

        {/* ── Main layout: ticket list + detail panel ── */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 'var(--kiln-space-4)', alignItems: 'start' }}>

          {/* ── Ticket list ── */}
          <div>
            {filtered.length === 0 ? (
              <p style={{ textAlign: 'center', padding: 'var(--kiln-space-10)', color: 'var(--kiln-gray-500)', fontSize: 'var(--kiln-text-sm)', margin: 0 }}>
                No tickets found.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-3)' }}>
                {filtered.map(ticket => (
                  <Card
                    key={ticket.id}
                    variant={selected?.id === ticket.id ? 'raised' : 'default'}
                    hoverLift
                    onClick={() => setSelected(selected?.id === ticket.id ? null : ticket)}
                    style={{ '--kiln-card-padding': 'var(--kiln-space-4)' } as React.CSSProperties}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--kiln-space-3)' }}>
                      <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', flex: 1, minWidth: 0 }}>
                        <ticket.icon size={20} style={{ color: 'var(--kiln-primary)', flexShrink: 0, marginTop: '2px' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-2)', marginBottom: 'var(--kiln-space-2)' }}>
                          <Badge variant={STATUS_BADGE[ticket.status]} size="sm">
                            {STATUS_LABEL[ticket.status]}
                          </Badge>
                          <Badge variant={PRIORITY_BADGE[ticket.priority]} size="sm">
                            {ticket.priority}
                          </Badge>
                        </div>
                        <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-900)', lineHeight: 1.35 }}>
                          {ticket.title}
                        </p>
                        <p style={{ margin: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
                          {ticket.author} · {ticket.submittedAt}
                        </p>
                      </div>

                      <DropdownMenu
                        trigger={
                          <Button variant="ghost" size="sm" aria-label="Ticket actions">⋯</Button>
                        }
                        align="end"
                        items={[
                          { type: 'label', label: 'Change status' },
                          ...(ticket.status !== 'open'        ? [{ label: 'Mark as Open',        onSelect: () => updateStatus(ticket.id, 'open')        }] : []),
                          ...(ticket.status !== 'in-progress' ? [{ label: 'Mark as In Progress', onSelect: () => updateStatus(ticket.id, 'in-progress') }] : []),
                          ...(ticket.status !== 'resolved'    ? [{ label: 'Mark as Resolved',    onSelect: () => updateStatus(ticket.id, 'resolved')    }] : []),
                          { type: 'separator' },
                          { label: 'Delete ticket', onSelect: () => deleteTicket(ticket.id), variant: 'danger' as const },
                        ]}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* ── Ticket detail panel ── */}
          {selected && (
            <Card variant="default" style={{ '--kiln-card-padding': 'var(--kiln-space-5)' } as React.CSSProperties}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--kiln-space-3)', marginBottom: 'var(--kiln-space-4)' }}>
                <h4 style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', fontWeight: 700, color: 'var(--kiln-gray-900)', lineHeight: 1.35, flex: 1 }}>
                  {selected.title}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelected(null)}
                  aria-label="Close detail panel"
                >
                  ✕
                </Button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-2)', marginBottom: 'var(--kiln-space-4)' }}>
                <Badge variant={STATUS_BADGE[selected.status]}>{STATUS_LABEL[selected.status]}</Badge>
                <Badge variant={PRIORITY_BADGE[selected.priority]}>{selected.priority}</Badge>
                <Badge variant="neutral">{selected.category}</Badge>
              </div>

              <div style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', marginBottom: 'var(--kiln-space-3)' }}>
                Submitted by <strong>{selected.author}</strong> · {selected.submittedAt}
              </div>

              <p style={{ margin: '0 0 var(--kiln-space-5)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-700)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                {selected.description}
              </p>

              <div style={{ display: 'flex', gap: 'var(--kiln-space-2)', flexWrap: 'wrap' }}>
                {selected.status !== 'in-progress' && (
                  <Tooltip content="Start working on this ticket" side="top">
                    <Button variant="secondary" size="sm" onClick={() => updateStatus(selected.id, 'in-progress')}>
                      Start
                    </Button>
                  </Tooltip>
                )}
                {selected.status !== 'resolved' && (
                  <Tooltip content="Mark as resolved" side="top">
                    <Button variant="primary" size="sm" onClick={() => updateStatus(selected.id, 'resolved')}>
                      Resolve
                    </Button>
                  </Tooltip>
                )}
                {selected.status === 'resolved' && (
                  <Tooltip content="Reopen this ticket" side="top">
                    <Button variant="secondary" size="sm" onClick={() => updateStatus(selected.id, 'open')}>
                      Reopen
                    </Button>
                  </Tooltip>
                )}
                <Button variant="danger" size="sm" onClick={() => deleteTicket(selected.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* ── FAQ section ── */}
        <div style={{ marginTop: 'var(--kiln-space-8)', paddingTop: 'var(--kiln-space-6)', borderTop: '1px solid var(--kiln-gray-200)' }}>
          <p style={{
            fontSize: 'var(--kiln-text-xs)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--kiln-primary)',
            marginBottom: 'var(--kiln-space-3)',
            marginTop: 0,
          }}>
            Common questions
          </p>
          <Accordion items={FAQ_ITEMS} />
        </div>
      </div>

      {/* ── New ticket modal ── */}
      <Modal
        isOpen={newOpen}
        onClose={() => { setNewOpen(false); resetForm(); }}
        title="Submit a new ticket"
      >
        <div style={{ padding: '0 var(--kiln-space-5) var(--kiln-space-5)', minWidth: 300 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-4)', marginBottom: 'var(--kiln-space-5)' }}>
            <Input
              label="Title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Brief, descriptive title"
              helperText="Be as specific as possible."
            />
            <Textarea
              label="Description"
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              placeholder="Steps to reproduce, expected vs. actual behaviour, environment details…"
              rows={4}
              maxLength={1000}
              showCharCount
            />

            <div>
              <p style={{ margin: '0 0 var(--kiln-space-3)', fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-700)' }}>
                Priority
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-2)' }}>
                {PRIORITY_OPTIONS.map(p => (
                  <RadioButton
                    key={p}
                    name="new-ticket-priority"
                    value={p}
                    checked={newPriority === p}
                    onChange={() => setNewPriority(p)}
                    description={PRIORITY_DESC[p]}
                  >
                    <span style={{ textTransform: 'capitalize' }}>{p}</span>
                  </RadioButton>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--kiln-space-3)' }}>
            <Button
              variant="secondary"
              onClick={() => { setNewOpen(false); resetForm(); }}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!newTitle.trim()}
              onClick={submitTicket}
              style={{ flex: 1 }}
            >
              Submit ticket
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
