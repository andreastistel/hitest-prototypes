import { useState, useEffect } from 'react';

const cartPricing = {
    subscription: { price: 350, label: 'Subscription' },
    perpetual: { price: 800, label: 'Fixed version' }
} as const;

const supportPricing = {
    subscription: {
        standard: { price: 0, label: 'Support', display: 'Included', note: null },
        plus: { price: 50, label: 'Premium Support', display: '+$50.00', note: null }
    },
    perpetual: {
        standard: { price: 0, label: 'Support', display: 'Included', note: 'then $300/yr' },
        plus: { price: 0, label: 'Premium Support', display: 'Included', note: 'then $400/yr' }
    }
} as const;

type LicenseType = 'subscription' | 'perpetual';
type AdvantageType = 'plus' | 'standard';

function formatPrice(amount: number): string {
    return '$' + amount.toFixed(2);
}

export default function Cart() {
    const [license, setLicense] = useState<LicenseType>('subscription');
    const [advantage, setAdvantage] = useState<AdvantageType>('standard');

    useEffect(() => {
        const handler = (e: CustomEvent) => {
            if (e.detail.license) setLicense(e.detail.license);
            if (e.detail.advantage) setAdvantage(e.detail.advantage);
        };
        window.addEventListener('cart-update' as any, handler);
        return () => window.removeEventListener('cart-update' as any, handler);
    }, []);

    const cart = cartPricing[license];
    const support = supportPricing[license][advantage];
    const total = cart.price + support.price;

    return (
        <div className="cart-card">
            <div className="cart-total-section">
                <span className="cart-total-label">TOTAL</span>
                <div className="cart-total-prices">
                    <span className="cart-total-price">{formatPrice(total)}</span>
                    {license === 'subscription' && <span className="cart-total-note">yearly</span>}
                </div>
            </div>

            <div className="cart-divider"></div>

            <div className="cart-row">
                <span className="cart-row-label">{cart.label}</span>
                <span className="cart-row-value">{formatPrice(cart.price)}</span>
            </div>

            <div className="cart-row">
                <span className="cart-row-label">{support.label}</span>
                <div style={{ textAlign: 'right' }}>
                    <span className="cart-row-value">{support.display}</span>
                    {support.note && <div className="cart-row-note">{support.note}</div>}
                </div>
            </div>
        </div>
    );
}
