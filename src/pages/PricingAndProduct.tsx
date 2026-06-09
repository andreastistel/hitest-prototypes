import React from 'react';
import { Container, Button } from 'highsoft-ui';
import {
  Award,
  BarChart2,
  Briefcase,
  ChevronDown,
  Code,
  Columns,
  GitBranch,
  Grid,
  Layout,
  Map,
  Tool,
  Trash2,
  TrendingUp,
} from 'react-feather';
import ShopProgressBar from '../components/ShopProgressBar';
import '../styles/alt-shop.scss';
import '../styles/alt-cart.scss';

const SUB_NAV = [
  { icon: Award, label: 'Pricing and Products', active: true },
  { icon: Briefcase, label: 'OEM License' },
  { icon: Columns, label: 'Compare plans' },
  { icon: Tool, label: 'Custom Projects', badge: 'NEW' },
] as const;

function AltSubHeader() {
  return (
    <div className="alt-sub-header">
      <div className="alt-sub-header__inner">
        {SUB_NAV.map(({ icon: Icon, label, active, badge }: { icon: React.ElementType; label: string; active?: boolean; badge?: string }) => (
          <div key={label} className={`alt-sub-header__item${active ? ' alt-sub-header__item--active' : ''}`}>
            <Icon size={20} />
            <span className="alt-sub-header__label">
              {label}
              {badge && <span className="alt-sub-header__badge">{badge}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Catalog prices (from the Figma design). This is a static visual copy — the
// page is frozen in its empty initial state, so nothing is selected.
const PRICES = {
  core: 565,
  stock: 364,
  maps: 128,
  gantt: 113,
  python: 220,
  dash: 363,
  grid: 264,
};

function IconBadge({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`alt-icon-badge ${active ? 'alt-icon-badge--active' : 'alt-icon-badge--inactive'}`}
    >
      <div className="alt-icon-badge__inner">{children}</div>
    </div>
  );
}

// Product "Add" trigger — looks like the real dropdown trigger but opens
// nothing (the functional Dropdown is intentionally omitted).
function AddTrigger({ modifier }: { modifier: 'core' | 'addon' }) {
  return (
    <div className={`alt-dropdown alt-dropdown--${modifier}`}>
      <Button variant="success" iconRight={<ChevronDown size={14} />}>
        Add
      </Button>
    </div>
  );
}

function LibraryRow({
  icon,
  name,
  price,
  unit = '/seat',
}: {
  icon: React.ReactNode;
  name: string;
  price: number;
  unit?: string;
}) {
  return (
    <div className="alt-library-row">
      <div className="alt-library-row__info">
        <IconBadge active={false}>{icon}</IconBadge>
        <span className="alt-library-row__name">{name}</span>
      </div>
      <div className="alt-library-row__price-actions">
        <span className="alt-library-row__price">+ {price} USD</span>
        <span className="alt-library-row__unit">{unit}</span>
        {/* Add-ons are disabled until Charts Core is selected — the
            faithful empty-state appearance. */}
        <Button variant="soft" className="alt-add-btn" type="button" disabled>
          Add
        </Button>
      </div>
    </div>
  );
}

function AltCartEmpty() {
  return (
    <div className="AltCart">
      <div className="AltCart-header">
        <h2>Cart</h2>
        <button type="button" className="AltCart-empty-button" aria-label="Empty cart">
          <Trash2 aria-hidden />
        </button>
      </div>
      <div className="AltCart-category-title">Total</div>
      <div className="AltCart-total">
        <span className="AltCart-total-content">0.00</span>
        <span>USD</span>
      </div>
      <Button
        variant="success"
        size={500}
        className="AltCart-checkout-button btn-a"
        disabled
      >
        Checkout
      </Button>
    </div>
  );
}

export default function PricingAndProduct() {
  return (
    <>
      <AltSubHeader />
      <Container className="alt-shop container">
      <div className="alt-page-header">
        <div className="alt-page-header__text">
          <h1 className="alt-page-header__title">Pricing and Products</h1>
          <p className="alt-page-header__subtitle">
            Pick your products and customize your subscription and usage terms to
            fit your needs. Check the <a href="#faq">FAQ</a> below for common
            questions, or <a href="#contact">contact us</a> if you need a hand.
          </p>
        </div>
        <ShopProgressBar
          steps={{
            Configure: '/alt',
            Checkout: '/alt/checkout',
            Complete: '/alt/checkout-confirmation',
          }}
        />
      </div>

      <div className="alt-shop__body">
        <div className="alt-shop__main">
          {/* ── Section 1: Choose your products ── */}
          <div className="alt-card">
            <div className="alt-card__body">
              <div className="alt-card__inner">
                <div className="alt-card__heading">
                  <h2>Choose your products</h2>
                  <p>
                    Add the products you need and pick the number of seats. You'll
                    configure the details on the next step.
                  </p>
                </div>

                <div className="alt-products">
                  {/* Charts Core */}
                  <div className="alt-product-card alt-product-card--expanded">
                    <div className="alt-product-card__header">
                      <div className="alt-product-card__title">
                        <IconBadge active={false}>
                          <BarChart2 size={16} />
                        </IconBadge>
                        <span className="alt-product-card__name">Charts Core</span>
                      </div>
                      <div className="alt-product-card__price-actions">
                        <div className="alt-product-card__price">
                          <span className="amount">{PRICES.core} USD</span>
                          <span className="unit">/seat</span>
                        </div>
                        <AddTrigger modifier="core" />
                      </div>
                    </div>

                    <div className="alt-product-card__addons">
                      {/* Libraries */}
                      <div className="alt-library-section">
                        <div className="alt-divider">
                          <div className="alt-divider__line alt-divider__line--short" />
                          <span className="alt-divider__label">Libraries</span>
                          <div className="alt-divider__line" />
                        </div>
                        <div className="alt-library-list">
                          <LibraryRow icon={<TrendingUp size={16} />} name="Stock" price={PRICES.stock} />
                          <LibraryRow icon={<Map size={16} />} name="Maps" price={PRICES.maps} />
                          <LibraryRow icon={<GitBranch size={16} />} name="Gantt" price={PRICES.gantt} />
                        </div>
                      </div>

                      {/* Integration */}
                      <div className="alt-library-section">
                        <div className="alt-divider">
                          <div className="alt-divider__line alt-divider__line--short" />
                          <span className="alt-divider__label">Integration</span>
                          <div className="alt-divider__line" />
                        </div>
                        <div className="alt-library-list">
                          <LibraryRow
                            icon={<Code size={16} />}
                            name="Python Integration"
                            price={PRICES.python}
                            unit="/yearly"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard */}
                  <div className="alt-product-card alt-product-card--simple">
                    <div className="alt-product-card__header">
                      <div className="alt-product-card__title">
                        <IconBadge active={false}>
                          <Layout size={16} />
                        </IconBadge>
                        <span className="alt-product-card__name">Dashboard</span>
                      </div>
                      <div className="alt-product-card__price-actions">
                        <div className="alt-product-card__price">
                          <span className="amount">{PRICES.dash} USD</span>
                          <span className="unit">/seat</span>
                        </div>
                        <AddTrigger modifier="addon" />
                      </div>
                    </div>
                  </div>

                  {/* Grid Pro */}
                  <div className="alt-product-card alt-product-card--simple">
                    <div className="alt-product-card__header">
                      <div className="alt-product-card__title">
                        <IconBadge active={false}>
                          <Grid size={16} />
                        </IconBadge>
                        <span className="alt-product-card__name">Grid Pro</span>
                      </div>
                      <div className="alt-product-card__price-actions">
                        <div className="alt-product-card__price">
                          <span className="amount">{PRICES.grid} USD</span>
                          <span className="unit">/seat</span>
                        </div>
                        <AddTrigger modifier="addon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Cart sidebar ── */}
        <div className="alt-cart">
          <AltCartEmpty />
        </div>
      </div>
    </Container>
    </>
  );
}
