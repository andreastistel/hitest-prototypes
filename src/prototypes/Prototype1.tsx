import { useState } from 'react';
import Cart from '../components/Cart';

type LicenseType = 'subscription' | 'perpetual';
type AdvantageType = 'standard' | 'plus';

const checkedSvg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <path d="M7 12.5l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const uncheckedSvg = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" stroke="#d2d2d7" strokeWidth="2" fill="none" />
  </svg>
);

const pricing: Record<LicenseType, Record<AdvantageType, string>> = {
  subscription: { plus: '$50 / year', standard: 'Included' },
  perpetual: { plus: 'Free first year, then $400/yr', standard: 'Free first year, then $300/yr' },
};

export default function Prototype1() {
  const [license, setLicense] = useState<LicenseType>('subscription');
  const [advantage, setAdvantage] = useState<AdvantageType>('standard');

  function notify(nextLicense: LicenseType, nextAdvantage: AdvantageType) {
    window.dispatchEvent(new CustomEvent('cart-update', {
      detail: { license: nextLicense, advantage: nextAdvantage },
    }));
  }

  function selectLicense(value: LicenseType) {
    setLicense(value);
    notify(value, advantage);
  }

  function selectAdvantage(value: AdvantageType) {
    setAdvantage(value);
    notify(license, value);
  }

  return (
    <div className="page-layout">
      <div className="container">

        <div className="section-card">
          <h2>How will you license the software?</h2>
          <p className="section-subtitle">Pick the model that fits how your team works.</p>

          <div className="toggle-cards">
            <div
              className={`toggle-card${license === 'subscription' ? ' selected' : ''}`}
              onClick={() => selectLicense('subscription')}
            >
              <span className="check-icon">
                {license === 'subscription' ? checkedSvg : uncheckedSvg}
              </span>
              <h3>Subscription</h3>
              <p className="toggle-desc">Get the latest version with support included.</p>
            </div>
            <div
              className={`toggle-card${license === 'perpetual' ? ' selected' : ''}`}
              onClick={() => selectLicense('perpetual')}
            >
              <span className="check-icon">
                {license === 'perpetual' ? checkedSvg : uncheckedSvg}
              </span>
              <h3>Fixed version</h3>
              <p className="toggle-desc">Pay once.<br />Use 12.4 version forever.</p>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h2>Add-ons</h2>
          <p className="section-subtitle">Everything you need to build and maintain your implementation.</p>

          <div className="toggle-cards">
            <div
              className={`toggle-card${advantage === 'standard' ? ' selected' : ''}`}
              onClick={() => selectAdvantage('standard')}
            >
              <span className="check-icon">
                {advantage === 'standard' ? checkedSvg : uncheckedSvg}
              </span>
              <h3>Support</h3>
              <p className={`toggle-price${advantage === 'standard' ? ' included' : ''}`}>{pricing[license].standard}</p>
              <span className="card-tag">Essential Support</span>
              <hr className="card-divider" />
              <ul className="card-bullets">
                <li>10 hours tech support</li>
                <li>36 hour response time</li>
                <li>Access to all new releases</li>
                <li>2nd line support by core developers</li>
                <li className="more-link">and more…</li>
              </ul>
            </div>
            <div
              className={`toggle-card${advantage === 'plus' ? ' selected' : ''}`}
              onClick={() => selectAdvantage('plus')}
            >
              <span className="check-icon">
                {advantage === 'plus' ? checkedSvg : uncheckedSvg}
              </span>
              <h3>Premium Support</h3>
              <p className="toggle-price">{pricing[license].plus}</p>
              <span className="card-tag card-tag--highlight">Best for Teams</span>
              <hr className="card-divider" />
              <p className="premium-includes">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Everything in Support and…
              </p>
              <ul className="card-bullets">
                <li className="highlight">20 hours tech support</li>
                <li className="highlight">17 hour response time</li>
                <li className="highlight">Dedicated support engineer</li>
                <li className="highlight">Video calls</li>
                <li className="more-link">and more…</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <aside className="cart-sidebar">
        <Cart />
      </aside>
    </div>
  );
}
