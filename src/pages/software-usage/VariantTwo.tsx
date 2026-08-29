import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Container, Checkbox, RadioBox, RadioBoxGroup, InputSolo, Button } from 'highsoft-ui';
import { Plus, PlusCircle, X } from 'react-feather';
import '../../styles/alt-shop.scss';
import '../../styles/software-usage-v2.scss';

/**
 * "How will the software be used?" — variant 2, Figma node 495:9492.
 *
 * Differs from variant 1: the two options are large centred radio boxes, the
 * named applications become a removable list, and "Internal use only" is a bar
 * attached under the card.
 */

// Figma exports this as `terminal-square`; feather has no square variant.
function TerminalSquareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M4.66667 10L6.66667 8L4.66667 6M8.66667 10H11.3333M5.2 14H10.8C11.9201 14 12.4802 14 12.908 13.782C13.2843 13.5903 13.5903 13.2843 13.782 12.908C14 12.4802 14 11.9201 14 10.8V5.2C14 4.0799 14 3.51984 13.782 3.09202C13.5903 2.71569 13.2843 2.40973 12.908 2.21799C12.4802 2 11.9201 2 10.8 2H5.2C4.0799 2 3.51984 2 3.09202 2.21799C2.71569 2.40973 2.40973 2.71569 2.21799 3.09202C2 3.51984 2 4.0799 2 5.2V10.8C2 11.9201 2 12.4802 2.21799 12.908C2.40973 13.2843 2.71569 13.5903 3.09202 13.782C3.51984 14 4.0799 14 5.2 14Z"
        stroke="currentColor"
        strokeWidth="0.886667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SoftwareUsageVariantTwo() {
  const [usage, setUsage] = useState('application');
  const [internal, setInternal] = useState(false);
  const [draft, setDraft] = useState('');
  const [apps, setApps] = useState<Array<string>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Only one application can be named; remove it to name a different one.
  const atLimit = apps.length >= 1;
  const name = draft.trim();
  const canAdd = name.length > 0 && !atLimit;

  function addApp() {
    if (!canAdd) return;
    setApps([name]);
    setDraft('');
  }

  // Internal use and external use are mutually exclusive — whichever side is
  // in play disables the other, as in type 1.
  const usagePicked = usage !== '';

  // A radio cannot be unpicked, which would leave Internal use only disabled
  // for good — clicking the selected option clears it instead.
  function handleOptionClick(e: MouseEvent<HTMLDivElement>) {
    const input = (e.target as HTMLElement)
      .closest('label')
      ?.querySelector<HTMLInputElement>('input[type="radio"]');
    if (input && input.value === usage) {
      // Stop the label from re-activating the radio we are clearing.
      e.preventDefault();
      setUsage('');
    }
  }

  return (
    <Container className="software-usage-v2 container">
      <div className="alt-sub-card usage2__card">
        <div className="usage2__heading">
          <h2>How are you planning to use the software?</h2>
          <p>Gives you access to use the software and Advantage as long as you subscribe</p>
        </div>

        <div onClickCapture={handleOptionClick}>
          <RadioBoxGroup
            name="usage"
            value={usage}
            onChange={setUsage}
            className="usage2__options"
          >
            <RadioBox value="website" disabled={internal}>
              <div className="usage2__option-title">Website</div>
              <div className="usage2__option-meta">Same chart for everyone</div>
            </RadioBox>
            <RadioBox value="application" disabled={internal}>
              <div className="usage2__option-title">Application(s)</div>
              <div className="usage2__option-meta">Tailored charts for users</div>
            </RadioBox>
          </RadioBoxGroup>
        </div>

        {usage === 'application' && (
          <>
            <div className="alt-sub-card__extras-label">
              <div className="line" />
              <span>Name your application(s)</span>
              <div className="line" />
            </div>

            <div className="usage2__list-block">
              <InputSolo
                ref={inputRef}
                placeholder="Application name"
                value={draft}
                disabled={atLimit}
                helpText={atLimit ? 'Only one application can be named.' : undefined}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addApp();
                  }
                }}
                button={
                  <Button
                    variant="neutral"
                    size={100}
                    iconLeft={<Plus size={12} />}
                    onClick={addApp}
                    disabled={!canAdd}
                  >
                    Add to list
                  </Button>
                }
              />

              {apps.length > 0 && (
                <ul className="usage2__apps">
                  {apps.map((app) => (
                    <li key={app} className="usage2__app">
                      <span className="usage2__app-name">
                        <TerminalSquareIcon />
                        {app}
                      </span>
                      <Button
                        variant="transparent"
                        size={50}
                        iconRight={<X size={12} />}
                        onClick={() => {
                          setApps([]);
                          // The input is still disabled this tick; focus it
                          // once React has re-enabled it.
                          requestAnimationFrame(() => inputRef.current?.focus());
                        }}
                      >
                        Remove application
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>

      <Checkbox
        className="usage2__internal"
        checked={internal}
        onChange={setInternal}
        disabled={usagePicked}
        align="left"
      >
        <div className="usage2__internal-row">
          <span>Internal use only</span>
          <span className="usage2__internal-note">Only used by people within your organisation.</span>
        </div>
      </Checkbox>

      <div className="alt-info-boxes usage2__unsure">
        <button type="button" className="alt-info-box">
          <span className="alt-info-box__text">Unsure how your usage fits?</span>
          <span className="alt-info-box__icon" aria-hidden="true"><PlusCircle size={16} /></span>
        </button>
      </div>
    </Container>
  );
}
