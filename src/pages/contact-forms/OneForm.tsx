import { useState } from 'react';
import { Button, Container, Dropdown, DropdownItem, Heading, Typography } from 'highsoft-ui';
import { ChevronDown } from 'react-feather';
import { FORMS, FormPanel, useSharedFields } from './forms';

/**
 * Variant C — no picker up front: one form whose purpose is just another field,
 * chosen from a dropdown. Picking swaps the intro, the extra fields and the
 * submit label; everything else stays put.
 */
export default function ContactFormsOneForm() {
  const [activeId, setActiveId] = useState(FORMS[0].id);
  const { shared, update } = useSharedFields();
  const active = FORMS.find(({ id }) => id === activeId) ?? FORMS[0];

  return (
    <Container>
      <div className="contact-forms contact-forms--one-form">
        <header className="contact-forms__hero">
          <Heading level={1}>Get in touch</Heading>
          <Typography className="contact-forms__intro">
            All four forms reach the same sales team. Pick the one that fits — you can switch
            without losing what you have typed.
          </Typography>

          <div className="contact-forms__picker-field">
            <span className="contact-forms__purpose-label">What do you need?</span>
            <Dropdown
              value={activeId}
              onValueChange={setActiveId}
              closeOnSelect
              width="trigger"
              align="start"
              trigger={
                <Button
                  variant="soft"
                  size={300}
                  className="contact-forms__purpose-trigger"
                  iconRight={<ChevronDown size={16} />}
                >
                  {active.title}
                </Button>
              }
            >
              {FORMS.map(({ id, title, blurb }) => (
                <DropdownItem key={id} value={id}>
                  <span className="contact-forms__purpose">
                    <strong>{title}</strong>
                    <span className="contact-forms__card-blurb">{blurb}</span>
                  </span>
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
        </header>

        {/* key: replays the animation when you pick another purpose */}
        <section
          key={activeId}
          className="contact-forms__panel contact-forms__animated"
          aria-label={active.heading}
        >
          <FormPanel form={active} shared={shared} update={update} headingLevel={2} />
        </section>
      </div>
    </Container>
  );
}
