import { useRef, useState } from 'react';
import { Container, Checkbox, InputSolo, Button } from 'highsoft-ui';
import { Plus, X } from 'react-feather';
import '../../styles/alt-shop.scss';
import '../../styles/software-usage-v3.scss';
import TerminalSquareIcon from './TerminalSquareIcon';

/**
 * "How will the software be used?" — variant 3, Figma node 495:10459.
 *
 * Every option gets its own full-width row: the title on the left, its
 * description right-aligned on the same line.
 */
export default function SoftwareUsageVariantThree() {
  const [internal, setInternal] = useState(false);
  const [websites, setWebsites] = useState(false);
  const [applications, setApplications] = useState(false);
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

  // Same rule as the other two types: whichever side is in play disables the
  // other.
  const externalPicked = websites || applications;

  return (
    <Container className="software-usage-v3 container">
      <div className="alt-sub-card usage3__card">
        <div className="usage3__heading">
          <h2>How are you planning to use the software?</h2>
          <p>Select how you plan to use the software.</p>
        </div>

        <div className="usage3__options">
          <Checkbox
            checked={internal}
            onChange={setInternal}
            disabled={externalPicked}
            align="left"
          >
            <div className="usage3__row">
              <span className="usage3__row-title">Internal use only</span>
              <span className="usage3__row-meta">Only used by people within your organisation</span>
            </div>
          </Checkbox>

          <Checkbox
            checked={websites}
            onChange={setWebsites}
            disabled={internal}
            align="left"
          >
            <div className="usage3__row">
              <span className="usage3__row-title">Websites</span>
              <span className="usage3__row-meta">Same charts for all visitors without personalization</span>
            </div>
          </Checkbox>

          <Checkbox
            checked={applications}
            onChange={setApplications}
            disabled={internal}
            align="left"
          >
            <div className="usage3__row">
              <span className="usage3__row-title">Applications</span>
              <span className="usage3__row-meta">Tailored charts for users in external-facing applications</span>
            </div>
          </Checkbox>
        </div>

        {applications && (
          <div className="usage3__naming">
            <div className="alt-sub-card__extras-label">
              <div className="line" />
              <span>Name your application(s)</span>
              <div className="line" />
            </div>

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
              <ul className="usage3__apps">
                {apps.map((app) => (
                  <li key={app} className="usage3__app">
                    <span className="usage3__app-name">
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
        )}
      </div>
    </Container>
  );
}
