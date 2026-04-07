import { useState } from 'react';
import './Prototype2.css';

type ProductId = 'core' | 'stock' | 'maps' | 'gantt';

interface Product {
  id: ProductId;
  name: string;
  price: number;
}

type CartItem =
  | { kind: 'product'; product: Product }
  | { kind: 'suite' };

const products: Product[] = [
  { id: 'core',  name: 'Core',  price: 185 },
  { id: 'stock', name: 'Stock', price: 370 },
  { id: 'maps',  name: 'Maps',  price: 250 },
  { id: 'gantt', name: 'Gantt', price: 222 },
];

const suitePrice = 443;
const separateTotal = products.reduce((sum, p) => sum + p.price, 0);
const savings = separateTotal - suitePrice;

function Cart({ items, onRemoveProduct, onRemoveSuite }: {
  items: CartItem[];
  onRemoveProduct: (id: ProductId) => void;
  onRemoveSuite: () => void;
}) {
  const total = items.reduce((sum, item) =>
    item.kind === 'suite' ? sum + suitePrice : sum + item.product.price, 0
  );

  return (
    <aside className="p2-cart">
      <h3 className="p2-cart-title">Your order</h3>

      {items.length === 0 ? (
        <p className="p2-cart-empty">No items added yet.</p>
      ) : (
        <>
          <ul className="p2-cart-list">
            {items.map(item =>
              item.kind === 'suite' ? (
                <li key="suite" className="p2-cart-item p2-cart-item--suite">
                  <div className="p2-cart-item-info">
                    <div className="p2-cart-suite-dots">
                      {products.map(p => (
                        <span key={p.id} className={`p2-cart-dot p2-cart-dot--${p.id}`} />
                      ))}
                    </div>
                    <span className="p2-cart-item-name">Complete Suite</span>
                  </div>
                  <div className="p2-cart-item-right">
                    <span className="p2-cart-item-price">${suitePrice}</span>
                    <button
                      className="p2-cart-remove"
                      onClick={onRemoveSuite}
                      aria-label="Remove Complete Suite"
                    >×</button>
                  </div>
                </li>
              ) : (
                <li key={item.product.id} className="p2-cart-item">
                  <div className="p2-cart-item-info">
                    <span className={`p2-cart-dot p2-cart-dot--${item.product.id}`} />
                    <span className="p2-cart-item-name">{item.product.name}</span>
                  </div>
                  <div className="p2-cart-item-right">
                    <span className="p2-cart-item-price">${item.product.price}</span>
                    <button
                      className="p2-cart-remove"
                      onClick={() => onRemoveProduct(item.product.id)}
                      aria-label={`Remove ${item.product.name}`}
                    >×</button>
                  </div>
                </li>
              )
            )}
          </ul>
          <div className="p2-cart-footer">
            <span className="p2-cart-total-label">Total</span>
            <span className="p2-cart-total-amount">${total} <span className="p2-cart-total-unit">/ dev</span></span>
          </div>
          <button className="p2-cart-checkout">Continue →</button>
        </>
      )}
    </aside>
  );
}

export default function Prototype2() {
  const [cartProductIds, setCartProductIds] = useState<Set<ProductId>>(new Set());
  const [suiteInCart, setSuiteInCart] = useState(false);

  const cartItems: CartItem[] = [
    ...(suiteInCart ? [{ kind: 'suite' } as CartItem] : []),
    ...products
      .filter(p => cartProductIds.has(p.id))
      .map(p => ({ kind: 'product', product: p } as CartItem)),
  ];

  function addProduct(id: ProductId) {
    setCartProductIds(prev => new Set(prev).add(id));
  }

  function removeProduct(id: ProductId) {
    setCartProductIds(prev => { const n = new Set(prev); n.delete(id); return n; });
  }

  function addSuite() {
    setCartProductIds(new Set());
    setSuiteInCart(true);
  }

  function removeSuite() {
    setSuiteInCart(false);
  }

  const productGreyed = (id: ProductId) => suiteInCart || cartProductIds.has(id);
  const productAdded  = (id: ProductId) => cartProductIds.has(id);

  return (
    <div className="p2-page">
      <div className="p2-main">
        <div className="p2-product-grid">
          {products.map((p) => (
            <div key={p.id} className={`p2-product-card${productGreyed(p.id) ? ' in-cart' : ''}`}>
              <span className="p2-product-name">{p.name}</span>
              <div className="p2-product-price">
                <span className="p2-price-amount">${p.price}</span>
                <span className="p2-price-unit"> / dev</span>
              </div>
              <button
                className="p2-buy-btn"
                onClick={() => addProduct(p.id)}
                disabled={productGreyed(p.id)}
              >
                {productAdded(p.id) ? 'Added' : suiteInCart ? 'In suite' : 'Add to cart'}
              </button>
            </div>
          ))}
        </div>

        <div className={`p2-suite-card${suiteInCart ? ' in-cart' : ''}`}>
          <div className="p2-suite-badge">
            <span>⭐</span> Best Value — Most Popular
          </div>

          <h2 className="p2-suite-title">Complete Suite — Everything Included</h2>

          <div className="p2-suite-tags">
            {products.map((p) => (
              <span key={p.id} className={`p2-tag p2-tag--${p.id}`}>{p.name}</span>
            ))}
          </div>

          <div className="p2-suite-pricing">
            <div className="p2-suite-price">
              <span className="p2-suite-price-amount">${suitePrice}</span>
              <span className="p2-suite-price-unit"> / dev</span>
            </div>
            <p className="p2-suite-savings">🎉 Save ${savings} vs buying all separately</p>
          </div>

          <button className="p2-suite-btn" onClick={addSuite} disabled={suiteInCart}>
            {suiteInCart ? 'Added to cart' : 'Get the Complete Suite →'}
          </button>
        </div>
      </div>

      <Cart items={cartItems} onRemoveProduct={removeProduct} onRemoveSuite={removeSuite} />
    </div>
  );
}
