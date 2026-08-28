import { useState } from 'react';
import { Container, Heading, Label, Typography } from 'highsoft-ui';
import { FORMS, FormPanel, useSharedFields } from './forms';

/** Variant A — the dark mock: a sidebar of cards picks the form. */
export default function ContactFormsSidebar() {
  const [activeId, setActiveId] = useState(FORMS[0].id);
  const { shared, update } = useSharedFields();
  const active = FORMS.find(({ id }) => id === activeId) ?? FORMS[0];

  return (
    <Container>
      <div className="contact-forms contact-forms--sidebar">
        <aside className="contact-forms__sidebar">
          <Heading level={3}>Which form?</Heading>
          <Typography size={200} className="contact-forms__sidebar-intro">
            All four reach the same sales team. The right one gets you a useful answer first time.
          </Typography>

          <div className="contact-forms__picker" role="tablist" aria-orientation="vertical">
            {FORMS.map(({ id, title, blurb }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={id === activeId}
                className={`contact-forms__card${id === activeId ? ' contact-forms__card--active' : ''}`}
                onClick={() => setActiveId(id)}
              >
                <span className="contact-forms__card-title">
                  {title}
                  {id === activeId && (
                    <Label variant="brand" iconLeft={false}>
                      YOU’RE HERE
                    </Label>
                  )}
                </span>
                <span className="contact-forms__card-blurb">{blurb}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* key: replays the animation when you switch form */}
        <section
          key={activeId}
          className="contact-forms__panel contact-forms__animated"
          role="tabpanel"
          aria-label={active.heading}
        >
          <FormPanel form={active} shared={shared} update={update} />
        </section>
      </div>
    </Container>
  );
}
