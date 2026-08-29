import { useState } from 'react';
import { Container, Checkbox, InputSolo, Button } from 'highsoft-ui';
import { Plus, PlusCircle } from 'react-feather';
import '../styles/alt-shop.scss';
import '../styles/software-usage.scss';

/**
 * "How will the software be used?" — the usage section from the Pricing and
 * Products prototype, rebuilt to Figma node 2268:34278.
 */
export default function SoftwareUsage() {
  const [internal, setInternal] = useState(false);
  const [website, setWebsite] = useState(false);
  const [application, setApplication] = useState(true);

  // Internal use and external use are mutually exclusive — whichever side is
  // in play disables the other.
  const externalPicked = website || application;

  return (
    <Container className="software-usage container">
      <div className="alt-sub-card usage-card">
        <div className="usage-card__heading">
          <h2>How are you planning to use the software?</h2>
          <p>Gives you access to use the software and Advantage as long as you subscribe</p>
        </div>

        <Checkbox checked={internal} onChange={setInternal} disabled={externalPicked} align="left">
          <div>
            <div className="usage-card__option-title">Internal use only</div>
            <div className="usage-card__option-meta">Only used by people within your organisation.</div>
          </div>
        </Checkbox>

        <div className="usage-card__options">
          <Checkbox checked={website} onChange={setWebsite} disabled={internal} align="left">
            <div>
              <div className="usage-card__option-title">Website</div>
              <div className="usage-card__option-meta">Same charts for everyone</div>
            </div>
          </Checkbox>
          <Checkbox checked={application} onChange={setApplication} disabled={internal} align="left">
            <div>
              <div className="usage-card__option-title">Application(s)</div>
              <div className="usage-card__option-meta">Tailored charts for users</div>
            </div>
          </Checkbox>
        </div>

        {/* The design captures this with Application(s) selected — the naming
            step only applies to that option. */}
        {application && (
          <>
            <div className="alt-sub-card__extras-label">
              <div className="line" />
              <span>Name your application(s)</span>
              <div className="line" />
            </div>
            <InputSolo
              placeholder="Application name"
              button={
                <Button variant="success" iconLeft={<Plus size={16} />}>
                  Add to list
                </Button>
              }
            />
          </>
        )}
      </div>

      <div className="alt-info-boxes">
        <button type="button" className="alt-info-box">
          <span className="alt-info-box__text">Unsure how your usage fits?</span>
          <span className="alt-info-box__icon" aria-hidden="true"><PlusCircle size={16} /></span>
        </button>
      </div>
    </Container>
  );
}
