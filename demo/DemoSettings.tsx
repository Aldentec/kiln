import React, { useState } from 'react';
import {
  Card, Badge, Button, Tabs, Input, Textarea, Toggle, RadioButton, Modal,
  toast, ToastContainer, Tooltip,
} from '@doriansmith/kiln';

// ─── Types ───────────────────────────────────────────────────────────────────

type Plan = 'free' | 'pro' | 'team';

interface NotificationPref {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_NOTIFS: NotificationPref[] = [
  { id: 'email',     label: 'Email notifications',  description: 'Receive updates and alerts via email',                  enabled: true  },
  { id: 'push',      label: 'Browser push',         description: 'Real-time desktop notifications in your browser',       enabled: false },
  { id: 'marketing', label: 'Product updates',      description: 'New features, release notes, and announcements',        enabled: true  },
  { id: 'security',  label: 'Security alerts',      description: 'Login attempts and suspicious activity on your account', enabled: true  },
  { id: 'digest',    label: 'Weekly digest',        description: 'A summary of your activity sent every Monday morning',  enabled: false },
  { id: 'billing',   label: 'Billing notices',      description: 'Invoices, payment failures, and upcoming renewals',     enabled: true  },
];

const PLANS: { value: Plan; label: string; price: string; period: string; features: string[]; badge?: string }[] = [
  {
    value: 'free',
    label: 'Free',
    price: '$0',
    period: 'forever',
    features: ['5 projects', '1 GB storage', 'Community support', 'Basic analytics'],
  },
  {
    value: 'pro',
    label: 'Pro',
    price: '$12',
    period: '/month',
    features: ['Unlimited projects', '50 GB storage', 'Priority support', 'Custom domain', 'Advanced analytics'],
    badge: 'Most popular',
  },
  {
    value: 'team',
    label: 'Team',
    price: '$49',
    period: '/month',
    features: ['Everything in Pro', '500 GB storage', 'SSO / SAML', '99.9% SLA', 'Audit log', 'Dedicated CSM'],
  },
];

const ACTIVE_SESSIONS = [
  { id: 's1', device: 'MacBook Pro 14"',   location: 'San Francisco, US', last: 'Active now',    current: true  },
  { id: 's2', device: 'iPhone 15 Pro',     location: 'San Francisco, US', last: '2 hours ago',   current: false },
  { id: 's3', device: 'Chrome on Windows', location: 'New York, US',      last: '3 days ago',    current: false },
];

const SETTINGS_TABS = [
  { value: 'profile',       label: 'Profile'       },
  { value: 'notifications', label: 'Notifications' },
  { value: 'billing',       label: 'Billing'       },
  { value: 'security',      label: 'Security'      },
];

// ─── DemoSettings ─────────────────────────────────────────────────────────────

export default function DemoSettings() {
  const [tab, setTab] = useState('profile');

  // ── Profile ──────────────────────────────────────────────────────────────
  const [name,        setName]        = useState('Dorian Smith');
  const [email,       setEmail]       = useState('dorian@example.com');
  const [website,     setWebsite]     = useState('https://doriansmith.dev');
  const [bio,         setBio]         = useState('Full-stack developer building tools for indie devs. Creator of Kiln UI.');
  const [profileSaved, setProfileSaved] = useState(false);

  // ── Notifications ────────────────────────────────────────────────────────
  const [notifs,     setNotifs]     = useState<NotificationPref[]>(INITIAL_NOTIFS);
  const [notifSaved, setNotifSaved] = useState(false);

  const toggleNotif = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
    setNotifSaved(false);
  };

  // ── Billing ──────────────────────────────────────────────────────────────
  const [plan,      setPlan]      = useState<Plan>('pro');
  const [planSaved, setPlanSaved] = useState(false);

  // ── Security ─────────────────────────────────────────────────────────────
  const [twoFA,       setTwoFA]       = useState(false);
  const [currentPwd,  setCurrentPwd]  = useState('');
  const [newPwd,      setNewPwd]      = useState('');
  const [confirmPwd,  setConfirmPwd]  = useState('');
  const [pwdSaved,    setPwdSaved]    = useState(false);
  const [deleteOpen,  setDeleteOpen]  = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const pwdMismatch = newPwd && confirmPwd && newPwd !== confirmPwd;
  const pwdValid    = Boolean(currentPwd && newPwd && confirmPwd && !pwdMismatch);

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
          kiln-demo.app/settings
        </span>
      </div>

      <div style={{ padding: 'var(--kiln-space-5)' }}>
        <Tabs items={SETTINGS_TABS} value={tab} onChange={setTab} ariaLabel="Account settings" />

        <div style={{ marginTop: 'var(--kiln-space-6)' }}>

          {/* ══ Profile tab ══════════════════════════════════════════════════ */}
          {tab === 'profile' && (
            <div style={{ maxWidth: 480 }}>
              {/* Avatar row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-4)', marginBottom: 'var(--kiln-space-6)', padding: 'var(--kiln-space-4)', background: 'var(--kiln-surface)', borderRadius: 'var(--kiln-radius-lg)' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'var(--kiln-gradient-brand)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'var(--kiln-text-xl)', fontWeight: 700, color: '#fff',
                  flexShrink: 0, userSelect: 'none',
                }} aria-hidden="true">
                  {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '??'}
                </div>
                <div>
                  <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-900)' }}>
                    {name || 'Your Name'}
                  </p>
                  <p style={{ margin: '0 0 var(--kiln-space-2)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
                    {email}
                  </p>
                  <Badge variant="info" size="sm">Pro plan</Badge>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-4)' }}>
                <Input
                  label="Display name"
                  value={name}
                  onChange={e => { setName(e.target.value); setProfileSaved(false); }}
                  placeholder="Your full name"
                />
                <Input
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setProfileSaved(false); }}
                  placeholder="you@example.com"
                />
                <Input
                  label="Website"
                  type="url"
                  value={website}
                  onChange={e => { setWebsite(e.target.value); setProfileSaved(false); }}
                  placeholder="https://yoursite.com"
                  helperText="Optional. Shown on your public profile."
                />
                <Textarea
                  label="Bio"
                  value={bio}
                  onChange={e => { setBio(e.target.value); setProfileSaved(false); }}
                  placeholder="Tell us a bit about yourself…"
                  rows={3}
                  maxLength={200}
                  showCharCount
                  helperText="Up to 200 characters. Shown on your public profile."
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)', marginTop: 'var(--kiln-space-5)' }}>
                <Button
                  variant="primary"
                  onClick={() => { setProfileSaved(true); toast.success('Profile saved.'); }}
                >
                  Save profile
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => { setName('Dorian Smith'); setEmail('dorian@example.com'); setBio('Full-stack developer building tools for indie devs. Creator of Kiln UI.'); setWebsite('https://doriansmith.dev'); setProfileSaved(false); }}
                >
                  Cancel
                </Button>
                {profileSaved && <Badge variant="success">Saved</Badge>}
              </div>
            </div>
          )}

          {/* ══ Notifications tab ════════════════════════════════════════════ */}
          {tab === 'notifications' && (
            <div style={{ maxWidth: 520 }}>
              <p style={{ margin: '0 0 var(--kiln-space-5)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                Choose which notifications you receive. You can change these at any time.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {notifs.map((notif, i) => (
                  <div key={notif.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 'var(--kiln-space-4)',
                    padding: 'var(--kiln-space-4) 0',
                    borderBottom: i < notifs.length - 1 ? '1px solid var(--kiln-gray-200)' : 'none',
                  }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-900)' }}>
                        {notif.label}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
                        {notif.description}
                      </p>
                    </div>
                    <Toggle
                      checked={notif.enabled}
                      onChange={() => { toggleNotif(notif.id); }}
                      label={notif.label}
                      labelHidden
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)', marginTop: 'var(--kiln-space-5)' }}>
                <Button
                  variant="primary"
                  onClick={() => { setNotifSaved(true); toast.success('Notification preferences saved.'); }}
                >
                  Save preferences
                </Button>
                {notifSaved && <Badge variant="success">Saved</Badge>}
              </div>
            </div>
          )}

          {/* ══ Billing tab ══════════════════════════════════════════════════ */}
          {tab === 'billing' && (
            <div>
              <p style={{ margin: '0 0 var(--kiln-space-5)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                Choose the plan that fits your workflow. Upgrade or downgrade at any time — changes take effect immediately.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 'var(--kiln-space-4)', marginBottom: 'var(--kiln-space-6)' }}>
                {PLANS.map(p => (
                  <Card
                    key={p.value}
                    variant={plan === p.value ? 'gradient-border' : 'default'}
                    onClick={() => { setPlan(p.value); setPlanSaved(false); }}
                    style={{
                      '--kiln-card-padding': 'var(--kiln-space-5)',
                      cursor: 'pointer',
                      position: 'relative',
                    } as React.CSSProperties}
                  >
                    {p.badge && (
                      <div style={{ position: 'absolute', top: -10, right: 12 }}>
                        <Badge variant="info" size="sm">{p.badge}</Badge>
                      </div>
                    )}

                    <div style={{ marginBottom: 'var(--kiln-space-3)' }}>
                      <RadioButton
                        name="billing-plan"
                        value={p.value}
                        checked={plan === p.value}
                        onChange={() => { setPlan(p.value); setPlanSaved(false); }}
                        description={`${p.price} ${p.period}`}
                      >
                        {p.label}
                      </RadioButton>
                    </div>

                    <ul style={{
                      margin: 0, padding: '0 0 0 var(--kiln-space-4)',
                      fontSize: 'var(--kiln-text-xs)',
                      color: 'var(--kiln-gray-600)',
                      lineHeight: '2',
                    }}>
                      {p.features.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </Card>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)' }}>
                <Button
                  variant="primary"
                  onClick={() => {
                    setPlanSaved(true);
                    toast.success(`Switched to ${PLANS.find(p2 => p2.value === plan)?.label} plan.`, { title: 'Plan updated' });
                  }}
                >
                  {plan === 'free' ? 'Downgrade' : 'Upgrade'} to {PLANS.find(p => p.value === plan)?.label}
                </Button>
                {planSaved && <Badge variant="success">Plan updated</Badge>}
              </div>
            </div>
          )}

          {/* ══ Security tab ════════════════════════════════════════════════ */}
          {tab === 'security' && (
            <div style={{ maxWidth: 520 }}>

              {/* Two-factor authentication */}
              <Card variant="default" style={{ '--kiln-card-padding': 'var(--kiln-space-4)', marginBottom: 'var(--kiln-space-5)' } as React.CSSProperties}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--kiln-space-4)' }}>
                  <div>
                    <p style={{ margin: '0 0 2px', fontWeight: 700, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-900)' }}>
                      Two-factor authentication
                    </p>
                    <p style={{ margin: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
                      Require a one-time code in addition to your password
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-2)', flexShrink: 0 }}>
                    <Badge variant={twoFA ? 'success' : 'pending'} size="sm">
                      {twoFA ? 'Enabled' : 'Disabled'}
                    </Badge>
                    <Toggle
                      checked={twoFA}
                      onChange={val => {
                        setTwoFA(val);
                        toast.info(`Two-factor authentication ${val ? 'enabled' : 'disabled'}.`);
                      }}
                      label="Two-factor authentication"
                      labelHidden
                    />
                  </div>
                </div>
              </Card>

              {/* Active sessions */}
              <p style={{ margin: '0 0 var(--kiln-space-3)', fontWeight: 700, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-900)' }}>
                Active sessions
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-2)', marginBottom: 'var(--kiln-space-6)' }}>
                {ACTIVE_SESSIONS.map(session => (
                  <div key={session.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 'var(--kiln-space-3)',
                    padding: 'var(--kiln-space-3) var(--kiln-space-4)',
                    background: 'var(--kiln-surface)',
                    borderRadius: 'var(--kiln-radius-md)',
                    flexWrap: 'wrap',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: '0 0 2px', fontWeight: 600, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-900)' }}>
                        {session.device}
                      </p>
                      <p style={{ margin: 0, fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
                        {session.location} · {session.last}
                      </p>
                    </div>
                    {session.current
                      ? <Badge variant="success" size="sm">This device</Badge>
                      : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast.warning(`Session on ${session.device} revoked.`)}
                        >
                          Revoke
                        </Button>
                      )
                    }
                  </div>
                ))}
              </div>

              {/* Change password */}
              <p style={{ margin: '0 0 var(--kiln-space-3)', fontWeight: 700, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-900)' }}>
                Change password
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-3)', marginBottom: 'var(--kiln-space-4)' }}>
                <Input
                  label="Current password"
                  type="password"
                  value={currentPwd}
                  onChange={e => { setCurrentPwd(e.target.value); setPwdSaved(false); }}
                  placeholder="Enter current password"
                />
                <Input
                  label="New password"
                  type="password"
                  value={newPwd}
                  onChange={e => { setNewPwd(e.target.value); setPwdSaved(false); }}
                  placeholder="Minimum 12 characters"
                />
                <Input
                  label="Confirm new password"
                  type="password"
                  value={confirmPwd}
                  onChange={e => { setConfirmPwd(e.target.value); setPwdSaved(false); }}
                  placeholder="Repeat new password"
                  errorText={pwdMismatch ? "Passwords don't match" : undefined}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)', marginBottom: 'var(--kiln-space-8)' }}>
                <Button
                  variant="primary"
                  disabled={!pwdValid}
                  onClick={() => {
                    setPwdSaved(true);
                    setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
                    toast.success('Password updated successfully.');
                  }}
                >
                  Update password
                </Button>
                {pwdSaved && <Badge variant="success">Updated</Badge>}
              </div>

              {/* Danger zone */}
              <div style={{ borderTop: '2px solid #ef4444', paddingTop: 'var(--kiln-space-5)' }}>
                <p style={{ margin: '0 0 var(--kiln-space-1)', fontWeight: 700, fontSize: 'var(--kiln-text-sm)', color: '#ef4444' }}>
                  Danger zone
                </p>
                <p style={{ margin: '0 0 var(--kiln-space-3)', fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Tooltip content="This will permanently delete your account" side="right">
                  <Button variant="danger" onClick={() => setDeleteOpen(true)}>
                    Delete account
                  </Button>
                </Tooltip>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Delete account confirmation modal ── */}
      <Modal
        isOpen={deleteOpen}
        onClose={() => { setDeleteOpen(false); setDeleteInput(''); }}
        title="Delete account"
      >
        <div style={{ padding: '0 var(--kiln-space-5) var(--kiln-space-5)', maxWidth: 380 }}>
          <p style={{ margin: '0 0 var(--kiln-space-4)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-700)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
            This action is <strong>permanent and irreversible</strong>. All your projects, data, and settings will be deleted immediately.
          </p>
          <Input
            label='Type "DELETE" to confirm'
            value={deleteInput}
            onChange={e => setDeleteInput(e.target.value)}
            placeholder="DELETE"
          />
          <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', marginTop: 'var(--kiln-space-4)' }}>
            <Button
              variant="secondary"
              onClick={() => { setDeleteOpen(false); setDeleteInput(''); }}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={deleteInput !== 'DELETE'}
              onClick={() => {
                setDeleteOpen(false);
                setDeleteInput('');
                toast.error('Account deleted. (Demo only)', { title: 'Account deleted' });
              }}
              style={{ flex: 1 }}
            >
              Delete forever
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
