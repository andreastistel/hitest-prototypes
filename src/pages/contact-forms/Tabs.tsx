import { useState } from 'react';
import { Container, Heading, Tabs, Typography } from 'highsoft-ui';
import { FORMS, FormPanel, useSharedFields } from './forms';

/**
 * Variant B — a fixed page title, then the tabs, then the chosen form on a
 * raised card. Only the card changes as you switch tab.
 */
export default function ContactFormsTabs() {
  const [activeId, setActiveId] = useState(FORMS[0].id);
  const { shared, update } = useSharedFields();
  const active = FORMS.find(({ id }) => id === activeId) ?? FORMS[0];

  return (
    <Container>
      <div className="contact-forms contact-forms--tabs">
        <header className="contact-forms__hero">
          <Heading level={1}>Get in touch</Heading>
          <Typography className="contact-forms__intro">
            All four forms reach the same sales team. Pick the one that fits — you can switch
            without losing what you have typed.
          </Typography>
        </header>

        {/* Each tab carries its blurb, so all four explain themselves before you pick. */}
        <Tabs
          items={FORMS.map(({ id, title, blurb }) => ({
            value: id,
            label: (
              <span className="contact-forms__tab-label">
                <strong>{title}</strong>
                <span className="contact-forms__card-blurb">{blurb}</span>
              </span>
            ),
          }))}
          value={activeId}
          onChange={setActiveId}
        />

        {/* key: replays the animation when you switch form */}
        <section
          key={activeId}
          className="contact-forms__panel contact-forms__animated"
          role="tabpanel"
          aria-label={active.heading}
        >
          <FormPanel form={active} shared={shared} update={update} headingLevel={2} />
        </section>
      </div>
    </Container>
  );
}
