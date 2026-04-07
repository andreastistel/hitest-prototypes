import './Prototype2.css';

const products = [
  { id: 'core',  name: 'Core',  price: 185 },
  { id: 'stock', name: 'Stock', price: 370 },
  { id: 'maps',  name: 'Maps',  price: 250 },
  { id: 'gantt', name: 'Gantt', price: 222 },
] as const;

const suitePrice = 443;
const separateTotal = products.reduce((sum, p) => sum + p.price, 0);
const savings = separateTotal - suitePrice;

export default function Prototype2() {
  return (
    <div className="p2-page">
      <div className="p2-product-grid">
        {products.map((p) => (
          <div key={p.id} className="p2-product-card">
            <span className="p2-product-name">{p.name}</span>
            <div className="p2-product-price">
              <span className="p2-price-amount">${p.price}</span>
              <span className="p2-price-unit"> / dev</span>
            </div>
            <button className="p2-buy-btn">Buy Now</button>
          </div>
        ))}
      </div>

      <div className="p2-suite-card">
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

        <button className="p2-suite-btn">Get the Complete Suite →</button>
      </div>
    </div>
  );
}
