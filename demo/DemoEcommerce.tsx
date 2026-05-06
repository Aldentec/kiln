import React, { useState } from 'react';
import {
  Card, Badge, Button, Grid, Chip, Input, Modal, Tabs, Accordion,
  toast, ToastContainer, Tooltip,
  StarFilledIcon, StarHalfIcon, StarIcon,
  AudioFullIcon, KeyboardIcon, ZapIcon, GridIcon, VideoCameraOnIcon, LocationPinIcon,
} from '@doriansmith/kiln';

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = 'all' | 'audio' | 'peripherals' | 'accessories';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  badge?: 'new' | 'sale' | 'soldout';
  category: 'audio' | 'peripherals' | 'accessories';
  description: string;
  specs: string[];
  icon: React.ComponentType<{ size?: number }>;
  rating: number;
  reviews: number;
}

interface CartItem {
  product: Product;
  qty: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 'p1', icon: AudioFullIcon, name: 'Wireless Headphones', price: 79.99,
    badge: 'new', category: 'audio',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life. Crystal-clear highs, deep bass, and an over-ear fit designed for all-day wear.',
    specs: ['30hr battery', 'Bluetooth 5.2', '40mm drivers', 'USB-C charging', 'Foldable design'],
    rating: 4.5, reviews: 128,
  },
  {
    id: 'p2', icon: KeyboardIcon, name: 'Mechanical Keyboard', price: 129.99, originalPrice: 159.99,
    badge: 'sale', category: 'peripherals',
    description: 'Compact TKL mechanical keyboard with RGB backlighting and hot-swappable switches. Fully compatible with Mac and Windows right out of the box.',
    specs: ['TKL layout', 'RGB backlit', 'Hot-swap sockets', 'USB-C', 'PBT doubleshot keycaps'],
    rating: 4.7, reviews: 342,
  },
  {
    id: 'p3', icon: ZapIcon, name: 'USB-C Hub 7-in-1', price: 49.99,
    category: 'accessories',
    description: 'Expand your laptop with 7 essential ports — including 4K HDMI output and 100W power delivery passthrough — in one slim aluminum hub.',
    specs: ['HDMI 4K@60Hz', '3× USB-A 3.0', 'SD + microSD', '100W PD passthrough', 'Aluminum body'],
    rating: 4.3, reviews: 89,
  },
  {
    id: 'p4', icon: GridIcon, name: 'Monitor Stand Pro', price: 39.99, originalPrice: 59.99,
    badge: 'sale', category: 'accessories',
    description: 'Adjustable bamboo monitor riser with a built-in cable management drawer and storage shelf. Supports monitors up to 32" at 27kg.',
    specs: ['Height adjustable', 'Cable management', '27kg capacity', 'Sustainable bamboo', 'Up to 32"'],
    rating: 4.4, reviews: 56,
  },
  {
    id: 'p5', icon: VideoCameraOnIcon, name: 'HD Webcam 1080p', price: 89.99,
    badge: 'new', category: 'peripherals',
    description: '1080p at 60fps with autofocus, low-light AI correction, a built-in dual-mic array, and a physical privacy shutter for peace of mind.',
    specs: ['1080p @ 60fps', 'Autofocus', 'Low-light AI', 'Dual microphone', 'Privacy shutter'],
    rating: 4.6, reviews: 201,
  },
  {
    id: 'p6', icon: LocationPinIcon, name: 'Desk Mat XL', price: 24.99,
    badge: 'soldout', category: 'accessories',
    description: 'Large format desk mat with premium stitched edges and a non-slip rubber base. Protects your desk and anchors your keyboard and mouse.',
    specs: ['90 × 40 cm', '4mm thick', 'Anti-slip base', 'Stitched edges', 'Machine washable'],
    rating: 4.8, reviews: 445,
  },
];

const CATEGORY_CHIPS: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'audio', label: 'Audio' },
  { value: 'peripherals', label: 'Peripherals' },
  { value: 'accessories', label: 'Accessories' },
];

const PRODUCT_TABS = [
  { value: 'description', label: 'Description' },
  { value: 'specs', label: 'Specs' },
  { value: 'faq', label: 'FAQ' },
];

const FAQ_ITEMS = [
  {
    id: 'q1',
    title: 'What is your return policy?',
    content: 'We offer a 30-day hassle-free return on all orders. Items must be unused and in original condition with all packaging intact.',
  },
  {
    id: 'q2',
    title: 'How long does shipping take?',
    content: 'Standard shipping takes 3–5 business days. Express shipping (1–2 business days) is available at checkout for an additional fee.',
  },
  {
    id: 'q3',
    title: 'Do you ship internationally?',
    content: 'Yes — we ship to 50+ countries. International delivery typically takes 7–14 business days and may be subject to local customs fees.',
  },
  {
    id: 'q4',
    title: 'Are products covered by warranty?',
    content: 'All electronics include a 12-month manufacturer warranty. Extended 3-year warranty plans are available to add at checkout.',
  },
];

const BADGE_MAP: Record<string, 'info' | 'warning' | 'pending'> = {
  new: 'info', sale: 'warning', soldout: 'pending',
};

const BADGE_LABEL: Record<string, string> = {
  new: 'New', sale: 'Sale', soldout: 'Sold out',
};

// ─── Star rating ─────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} style={{ color: '#f59e0b', letterSpacing: '-0.04em', display: 'inline-flex', alignItems: 'center', gap: '1px' }}>
      {[1, 2, 3, 4, 5].map(n => {
        if (n <= Math.floor(rating)) return <StarFilledIcon key={n} size={14} />;
        if (n - 0.5 <= rating) return <StarHalfIcon key={n} size={14} />;
        return <StarIcon key={n} size={14} />;
      })}
    </span>
  );
}

// ─── DemoEcommerce ────────────────────────────────────────────────────────────

export default function DemoEcommerce() {
  const [category, setCategory] = useState<Category>('all');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product>(PRODUCTS[0]);
  const [detailTab, setDetailTab] = useState('description');
  const [checkoutDone, setCheckoutDone] = useState(false);

  const addToCart = (product: Product) => {
    if (product.badge === 'soldout') return;
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
    toast.success(`${product.name} added to cart`, { title: 'Added to cart' });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.product.id !== id));

  const updateQty = (id: string, delta: number) =>
    setCart(prev => prev.map(i =>
      i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
    ));

  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filtered = PRODUCTS.filter(p => {
    const matchCat = category === 'all' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

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
          kiln-demo.app/shop
        </span>
        <Tooltip content={`${cartCount} item${cartCount === 1 ? '' : 's'} in cart`} side="bottom">
          <Button variant="secondary" size="sm" onClick={() => setCartOpen(true)} aria-label={`Cart: ${cartCount} item${cartCount === 1 ? '' : 's'}`}>
            🛒{cartCount > 0 && <> <Badge variant="info" size="sm">{cartCount}</Badge></>}
          </Button>
        </Tooltip>
      </div>

      <div style={{ padding: 'var(--kiln-space-5)' }}>
        {/* ── Toolbar ── */}
        <div style={{ display: 'flex', gap: 'var(--kiln-space-3)', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 'var(--kiln-space-5)' }}>
          <div style={{ flex: '1 1 200px' }}>
            <Input
              label="Search products"
              placeholder="Keyboard, webcam…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 'var(--kiln-space-2)', flexWrap: 'wrap', paddingBottom: 3 }}>
            {CATEGORY_CHIPS.map(c => (
              <Chip key={c.value} selected={category === c.value} onToggle={() => setCategory(c.value)}>
                {c.label}
              </Chip>
            ))}
          </div>
        </div>

        {/* ── Product grid ── */}
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', padding: 'var(--kiln-space-10)', color: 'var(--kiln-gray-500)', fontSize: 'var(--kiln-text-sm)', margin: 0 }}>
            No products found. Try a different search or filter.
          </p>
        ) : (
          <Grid minColWidth={180} gap="md">
            {filtered.map(product => (
              <Card
                key={product.id}
                variant={selected.id === product.id ? 'raised' : 'default'}
                hoverLift
                onClick={() => { setSelected(product); setDetailTab('description'); }}
                style={{
                  '--kiln-card-padding': 'var(--kiln-space-4)',
                  opacity: product.badge === 'soldout' ? 0.65 : 1,
                } as React.CSSProperties}
              >
                {/* Image area — fixed height */}
                <div style={{
                  fontSize: '2.25rem',
                  lineHeight: 1,
                  textAlign: 'center',
                  padding: 'var(--kiln-space-4)',
                  background: 'var(--kiln-gray-100)',
                  borderRadius: 'var(--kiln-radius-md)',
                  marginBottom: 'var(--kiln-space-3)',
                }} aria-hidden="true">
                  <product.icon size={24} />
                </div>

                {/* Badge row — always reserves 22 px so names start at the same baseline */}
                <div style={{ minHeight: 22, marginBottom: 'var(--kiln-space-2)', display: 'flex', alignItems: 'center' }}>
                  {product.badge && (
                    <Badge variant={BADGE_MAP[product.badge]} size="sm">{BADGE_LABEL[product.badge]}</Badge>
                  )}
                </div>

                {/* Product name — flex:1 so the price/CTA is always pinned to the bottom */}
                <p style={{
                  margin: '0 0 var(--kiln-space-2)',
                  fontSize: 'var(--kiln-text-sm)',
                  fontWeight: 700,
                  color: 'var(--kiln-gray-900)',
                  lineHeight: 1.35,
                  flex: 1,
                }}>
                  {product.name}
                </p>

                {/* Star rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 'var(--kiln-space-3)' }}>
                  <StarRating rating={product.rating} />
                  <span style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>({product.reviews})</span>
                </div>

                {/* Price + CTA — always anchored at the bottom */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--kiln-space-2)' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--kiln-gray-900)', fontSize: 'var(--kiln-text-base)', lineHeight: 1 }}>
                      ${product.price}
                    </div>
                    {/* Always render this 16 px slot — visible only when there's a sale price */}
                    <div style={{ height: 16, marginTop: 2 }}>
                      {product.originalPrice && (
                        <span style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-400)', textDecoration: 'line-through' }}>
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={product.badge === 'soldout'}
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                  >
                    + Add
                  </Button>
                </div>
              </Card>
            ))}
          </Grid>
        )}

        {/* ── Selected product detail ── */}
        <div style={{
          marginTop: 'var(--kiln-space-6)',
          paddingTop: 'var(--kiln-space-6)',
          borderTop: '1px solid var(--kiln-gray-200)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)', marginBottom: 'var(--kiln-space-4)', flexWrap: 'wrap' }}>
            <selected.icon size={28} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ margin: '0 0 2px', fontSize: 'var(--kiln-text-base)', fontWeight: 700, color: 'var(--kiln-gray-900)' }}>
                {selected.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-2)' }}>
                <StarRating rating={selected.rating} />
                <span style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
                  {selected.reviews} reviews
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)', flexShrink: 0 }}>
              <span style={{ fontWeight: 700, fontSize: 'var(--kiln-text-xl)', color: 'var(--kiln-primary)' }}>
                ${selected.price}
              </span>
              <Button
                variant="primary"
                size="sm"
                disabled={selected.badge === 'soldout'}
                onClick={() => addToCart(selected)}
              >
                Add to cart
              </Button>
            </div>
          </div>

          <Tabs items={PRODUCT_TABS} value={detailTab} onChange={setDetailTab} ariaLabel="Product details" />

          <div style={{ marginTop: 'var(--kiln-space-4)', minHeight: 80 }}>
            {detailTab === 'description' && (
              <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)', lineHeight: 'var(--kiln-leading-relaxed)' }}>
                {selected.description}
              </p>
            )}
            {detailTab === 'specs' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--kiln-space-2)' }}>
                {selected.specs.map(spec => (
                  <Badge key={spec} variant="neutral">{spec}</Badge>
                ))}
              </div>
            )}
            {detailTab === 'faq' && <Accordion items={FAQ_ITEMS} />}
          </div>
        </div>
      </div>

      {/* ── Cart modal ── */}
      <Modal
        isOpen={cartOpen}
        onClose={() => { setCartOpen(false); setCheckoutDone(false); }}
        title="Shopping Cart"
      >
        <div style={{ padding: '0 var(--kiln-space-5) var(--kiln-space-5)', minWidth: 280 }}>
          {checkoutDone ? (
            <div style={{ textAlign: 'center', padding: 'var(--kiln-space-8) var(--kiln-space-4)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--kiln-space-3)' }} aria-hidden="true">🎉</div>
              <p style={{ margin: '0 0 var(--kiln-space-2)', fontWeight: 700, fontSize: 'var(--kiln-text-base)', color: 'var(--kiln-gray-900)' }}>
                Order confirmed!
              </p>
              <p style={{ margin: '0 0 var(--kiln-space-4)', fontSize: 'var(--kiln-text-sm)', color: 'var(--kiln-gray-600)' }}>
                This is a demo — no real order was placed.
              </p>
              <Badge variant="success">Demo complete</Badge>
            </div>
          ) : cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--kiln-space-10)', color: 'var(--kiln-gray-500)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--kiln-space-3)' }} aria-hidden="true">🛒</div>
              <p style={{ margin: 0, fontSize: 'var(--kiln-text-sm)' }}>Your cart is empty.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kiln-space-2)', marginBottom: 'var(--kiln-space-4)' }}>
                {cart.map(item => (
                  <div key={item.product.id} style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-3)',
                    padding: 'var(--kiln-space-3)',
                    background: 'var(--kiln-surface)',
                    borderRadius: 'var(--kiln-radius-md)',
                  }}>
                    <item.product.icon size={20} style={{ flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 'var(--kiln-text-sm)', fontWeight: 600, color: 'var(--kiln-gray-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: 'var(--kiln-text-xs)', color: 'var(--kiln-gray-500)' }}>
                        ${item.product.price} each
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kiln-space-1)', flexShrink: 0 }}>
                      <Button variant="secondary" size="sm" onClick={() => updateQty(item.product.id, -1)}>−</Button>
                      <span style={{ minWidth: 20, textAlign: 'center', fontSize: 'var(--kiln-text-sm)', fontWeight: 700 }}>
                        {item.qty}
                      </span>
                      <Button variant="secondary" size="sm" onClick={() => updateQty(item.product.id, 1)}>+</Button>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 'var(--kiln-text-sm)', minWidth: 52, textAlign: 'right', flexShrink: 0, color: 'var(--kiln-gray-900)' }}>
                      ${(item.product.price * item.qty).toFixed(2)}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.product.id)} aria-label={`Remove ${item.product.name}`}>
                      ✕
                    </Button>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '2px solid var(--kiln-gray-200)',
                paddingTop: 'var(--kiln-space-3)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 'var(--kiln-space-4)',
              }}>
                <span style={{ fontWeight: 700, color: 'var(--kiln-gray-900)' }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: 'var(--kiln-text-xl)', color: 'var(--kiln-primary)' }}>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 'var(--kiln-space-3)' }}>
                <Button variant="secondary" onClick={() => setCartOpen(false)} style={{ flex: 1 }}>
                  Continue shopping
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setCart([]);
                    setCheckoutDone(true);
                    toast.success('Order placed! Thank you.', { title: 'Order confirmed' });
                  }}
                  style={{ flex: 1 }}
                >
                  Checkout →
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </Card>
  );
}
