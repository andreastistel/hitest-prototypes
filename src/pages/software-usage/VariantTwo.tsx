import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Container, Checkbox, RadioBox, InputSolo, Button } from 'highsoft-ui';
import { Plus, PlusCircle, X } from 'react-feather';
import '../../styles/alt-shop.scss';
import '../../styles/software-usage-v2.scss';
import TerminalSquareIcon from './TerminalSquareIcon';

/**
 * "How will the software be used?" — variant 2, Figma node 495:9492.
 *
 * Differs from variant 1: the two options are large centred radio boxes, the
 * named applications become a removable list, and "Internal use only" is a bar
 * attached under the card.
 */

export default function SoftwareUsageVariantTwo() {
  const [website, setWebsite] = useState(false);
  const [application, setApplication] = useState(true);
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
  const usagePicked = website || application;

  function toggle(value: string) {
    if (value === 'website') setWebsite((on) => !on);
    else setApplication((on) => !on);
  }

  // Website and Application(s) can both be on at once, which a radio input
  // cannot express on its own — the click drives the state instead, and its
  // default is cancelled so the input never latches itself on.
  function handleOptionClick(e: MouseEvent<HTMLDivElement>) {
    const input = (e.target as HTMLElement)
      .closest('label')
      ?.querySelector<HTMLInputElement>('input[type="radio"]');
    if (!input || input.disabled) return;
    e.preventDefault();
    toggle(input.value);
  }

  return (
    <Container className="software-usage-v2 container">
      <div className="alt-sub-card usage2__card">
        <div className="usage2__heading">
          <h2>How are you planning to use the software?</h2>
          <p>Gives you access to use the software and Advantage as long as you subscribe</p>
        </div>

        <div className="usage2__options" onClickCapture={handleOptionClick}>
          {/* Standalone, each with its own name, so the browser never groups
              them into a single-choice set. onChange covers the keyboard. */}
          <RadioBox
            name="usage-website"
            value="website"
            checked={website}
            onChange={toggle}
            disabled={internal}
          >
            <div className="usage2__option-title">Website</div>
            <div className="usage2__option-meta">Same chart for everyone</div>
          </RadioBox>
          <RadioBox
            name="usage-application"
            value="application"
            checked={application}
            onChange={toggle}
            disabled={internal}
          >
            <div className="usage2__option-title">Application(s)</div>
            <div className="usage2__option-meta">Tailored charts for users</div>
          </RadioBox>
        </div>

        {application && (
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
