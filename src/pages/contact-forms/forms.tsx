import { ReactNode, useState } from 'react';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormGroup,
  FormRow,
  Heading,
  InputGrouped,
  Link,
  RadioBox,
  RadioBoxGroup,
  SelectGrouped,
  Typography,
} from 'highsoft-ui';
import type { HeadingLevel } from 'highsoft-ui';
import { ExternalLink, HelpCircle } from 'react-feather';
import '../../styles/contact-forms.scss';

/**
 * The four sales forms and the panel that renders them, shared by every layout
 * variant in this folder (Sidebar, Tabs, OneForm). A variant decides how you
 * pick a form; everything below decides what a form *is*.
 *
 * Shared by every form: the contact block, the use-case description, the two
 * consents and the submit button. Per form: the copy, the submit label and an
 * optional bespoke `Body` section (see OemLicenseScope).
 *
 * All tooltip copy on the (?) icons is placeholder — the real strings live in
 * the current forms.
 */

const PRIVACY_POLICY = 'https://www.highcharts.com/privacy-policy';

/** Opens in a new tab without toggling the checkbox it may sit inside. */
function ExternalTextLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(event: React.MouseEvent) => event.stopPropagation()}
    >
      {children}
      <ExternalLink size={12} className="contact-forms__link-icon" />
    </Link>
  );
}

/** The (?) affordance from the current forms. Native title, no tooltip in the library. */
function Hint({ text }: { text: string }) {
  return (
    <span className="contact-forms__help" title={text} aria-label={text}>
      <HelpCircle size={14} />
    </span>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <div className="contact-forms__field-label">{children}</div>;
}

// ── OEM-specific section ──────────────────────────────────────────────────────

const LIBRARIES = [
  { id: 'core', label: 'Highcharts Core', hint: 'Line, area, column, pie and 50+ more chart types.' },
  { id: 'stock', label: 'Highcharts Stock', hint: 'Financial and time-series charts with technical indicators.' },
  { id: 'maps', label: 'Highcharts Maps', hint: 'Choropleth and point maps from GeoJSON.' },
  { id: 'gantt', label: 'Highcharts Gantt', hint: 'Project timelines and resource scheduling.' },
  { id: 'dashboards', label: 'Highcharts Dashboards', hint: 'Multi-component dashboard layouts.' },
  { id: 'grid', label: 'Highcharts Grid Pro', hint: 'Data grid with sorting and editing.' },
];

const USAGE_AREAS = [
  { value: 'none', label: 'None' },
  { value: 'internal', label: 'Internal License', hint: 'Internal, behind-the-firewall use only.' },
  { value: 'saas', label: 'SaaS License', hint: 'Highcharts hosted in a service you sell.' },
];

function OemLicenseScope() {
  return (
    <>
      <Heading level={4} className="contact-forms__section">
        License scope
      </Heading>

      <FieldLabel>Select libraries</FieldLabel>
      <CheckboxGroup name="libraries" defaultValue={['core']} align="left">
        {LIBRARIES.map(({ id, label, hint }) => (
          <Checkbox key={id} value={id}>
            <span className="contact-forms__option">
              {label}
              <Hint text={hint} />
            </span>
          </Checkbox>
        ))}
      </CheckboxGroup>

      <FieldLabel>Integrations</FieldLabel>
      <CheckboxGroup name="integrations" align="left">
        <Checkbox value="python">
          <span className="contact-forms__option">
            Python
            <Hint text="Highcharts for Python wrapper." />
          </span>
        </Checkbox>
      </CheckboxGroup>

      <FormGroup className="contact-forms__group" onSubmit={(event) => event.preventDefault()}>
        <InputGrouped
          label="Developer seat(s)"
          required
          type="number"
          min={1}
          placeholder="Eg. 1"
          labelIcon={<Hint text="Developers who will work with the Highcharts code." />}
        />
        <InputGrouped
          label="Your product name"
          placeholder="E.g. App"
          labelIcon={<Hint text="The product Highcharts will ship inside." />}
        />
        <InputGrouped
          label="Number of on-premise installation(s)?"
          required
          type="number"
          min={1}
          placeholder="E.g. 1"
          labelIcon={<Hint text="Customer sites where your product will be installed." />}
        />
      </FormGroup>

      <FieldLabel>Extend your usage area with</FieldLabel>
      <RadioBoxGroup name="usage-area" defaultValue="none">
        {USAGE_AREAS.map(({ value, label, hint }) => (
          <RadioBox key={value} value={value}>
            <span className="contact-forms__option">
              {label}
              {hint && <Hint text={hint} />}
            </span>
          </RadioBox>
        ))}
      </RadioBoxGroup>
    </>
  );
}

// ── Custom project specific section ───────────────────────────────────────────

const LANGUAGES = [
  'Angular', 'Javascript', 'Node JS', 'Python', 'React', 'Svelte',
  'TypeScript', 'Vue', 'R', 'Other',
];

function CustomProjectScope() {
  return (
    <div className="contact-forms__columns">
      <div>
        <FieldLabel>Product(s) of interest</FieldLabel>
        <CheckboxGroup name="products" align="left">
          {LIBRARIES.map(({ id, label }) => (
            <Checkbox key={id} value={id}>
              {label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
      <div>
        <FieldLabel>Language/framework</FieldLabel>
        <CheckboxGroup name="stack" align="left">
          {LANGUAGES.map((language) => (
            <Checkbox key={language} value={language}>
              {language}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    </div>
  );
}

// ── The four forms ────────────────────────────────────────────────────────────

type SelectField = {
  label: string;
  placeholder: string;
  options: Array<string>;
  required?: boolean;
};

export type ContactForm = {
  id: string;
  /** Form picker */
  title: string;
  blurb: string;
  /** Panel */
  heading: string;
  intro: ReactNode;
  /** Bespoke section between the contact block and the use-case block */
  Body?: () => ReactNode;
  useCaseTitle: string;
  useCaseHints: Array<string>;
  useCasePlaceholder: string;
  submitLabel: string;
};

// Abbreviated for the prototype — the real form lists every country.
const COUNTRIES = [
  'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China', 'Denmark',
  'Finland', 'France', 'Germany', 'India', 'Ireland', 'Italy', 'Japan',
  'Netherlands', 'Norway', 'Poland', 'Singapore', 'Spain', 'Sweden',
  'Switzerland', 'United Kingdom', 'United States', 'Other',
];

const SECTORS = [
  'Finance', 'Technology', 'Healthcare', 'Education', 'Public sector',
  'Manufacturing', 'Energy', 'Consulting', 'Other',
];

export const FORMS: Array<ContactForm> = [
  {
    id: 'contact',
    title: 'Contact us',
    blurb: 'General questions, quotes, renewals.',
    heading: 'Contact us',
    intro: "We're here to help and answer any question you might have.",
    useCaseTitle: 'What can we help you with?',
    useCaseHints: ['A short description of your use case helps us get you the right answer faster'],
    useCasePlaceholder: 'Provide a short description of your usecase',
    submitLabel: 'Submit',
  },
  {
    id: 'customized-license',
    title: 'Customized license',
    blurb: 'The standard license terms do not fit.',
    heading: 'Customized license',
    intro: 'Get in touch for a customized license, tailor-made for your needs!',
    useCaseTitle: 'What can we help you with?',
    useCaseHints: ['A short description of your use case helps us get you the right answer faster'],
    useCasePlaceholder: 'Provide a short description of your usecase',
    // The dark mock relabels this button; the current form just says "Submit".
    submitLabel: 'Request a customized license',
  },
  {
    id: 'custom-project',
    title: 'Custom project',
    blurb: 'You want us to build the visualization.',
    heading: 'Custom projects',
    intro:
      'Thanks for your interest in Custom Projects. Fill out the form below, and one of our ' +
      'implementation team members will contact you shortly.',
    Body: CustomProjectScope,
    useCaseTitle: 'Tell us more',
    useCaseHints: ['A short description of your project helps us get you the right answer faster'],
    useCasePlaceholder: 'Short description of your project',
    submitLabel: 'Submit',
  },
  {
    id: 'oem-license',
    title: 'OEM license',
    blurb: 'You ship Highcharts inside your product.',
    heading: 'OEM license',
    intro: (
      <>
        Choose this license if you are bundling Highcharts with hardware and/or software solutions
        designed to be hosted or operated by your clients. E.g. Intranets and other
        behind-the-firewall hosting scenarios, appliances, IoT devices or other embedded systems. We
        will get back to you with a quote or to discuss how we can tailor licensing to your needs.
      </>
    ),
    Body: OemLicenseScope,
    useCaseTitle: 'Tell us more',
    useCaseHints: [
      'Tell us about your product and how you intend to use Highcharts.',
      'The more we understand about what you are building and what you need, the faster we can tailor a license and quote for you.',
    ],
    useCasePlaceholder: 'Provide a short description of your use case',
    submitLabel: 'Submit',
  },
];

function GroupedSelect({
  field,
  value,
  onChange,
}: {
  field: SelectField;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <SelectGrouped
      label={field.label}
      required={field.required}
      placeholder={field.placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {field.options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </SelectGrouped>
  );
}

/**
 * Fields every form has in common. They live in one place so switching form
 * keeps what you already typed — the point of the page is that you can land on
 * the wrong form and move without starting over. Anything inside a form's own
 * `Body` is form-specific and is discarded on switch.
 */
const SHARED_FIELDS = {
  email: '',
  firstName: '',
  lastName: '',
  company: '',
  country: '',
  sector: '',
  useCase: '',
  privacy: false,
  marketing: false,
};

type SharedFields = typeof SHARED_FIELDS;
type UpdateShared = (field: keyof SharedFields, value: string | boolean) => void;

export function useSharedFields() {
  const [shared, setShared] = useState(SHARED_FIELDS);
  const update: UpdateShared = (field, value) =>
    setShared((current) => ({ ...current, [field]: value }));
  return { shared, update };
}

/** Everything inside a form panel. Variants wrap this in their own layout. */
export function FormPanel({
  form,
  shared,
  update,
  showHeader = true,
  headingLevel = 1,
}: {
  form: ContactForm;
  shared: SharedFields;
  update: UpdateShared;
  /** The one-form variant supplies its own heading instead. */
  showHeader?: boolean;
  /** Drops to 2 where a variant already has a page-level title above. */
  headingLevel?: HeadingLevel;
}) {
  const { Body } = form;

  return (
    <>
      {showHeader && (
        <>
          <Heading level={headingLevel}>{form.heading}</Heading>
          <Typography className="contact-forms__intro">{form.intro}</Typography>
        </>
      )}

      <Heading level={4} className="contact-forms__section">
        Contact information
      </Heading>
      <Typography size={100} className="contact-forms__hint">
        Fields marked with an asterisk (*) are required.
      </Typography>

      <FormGroup className="contact-forms__group" onSubmit={(event) => event.preventDefault()}>
        <InputGrouped
          label="Email"
          type="email"
          required
          value={shared.email}
          onChange={(event) => update('email', event.target.value)}
        />
        <FormRow>
          <InputGrouped
            label="First name"
            required
            value={shared.firstName}
            onChange={(event) => update('firstName', event.target.value)}
          />
          <InputGrouped
            label="Last name"
            required
            value={shared.lastName}
            onChange={(event) => update('lastName', event.target.value)}
          />
        </FormRow>
        <InputGrouped
          label="Company"
          required
          value={shared.company}
          onChange={(event) => update('company', event.target.value)}
        />
        <FormRow>
          <GroupedSelect
            field={{
              label: 'Country',
              placeholder: 'Select Country',
              options: COUNTRIES,
              required: true,
            }}
            value={shared.country}
            onChange={(value) => update('country', value)}
          />
          <GroupedSelect
            field={{ label: 'Sector', placeholder: 'Select Sector', options: SECTORS }}
            value={shared.sector}
            onChange={(value) => update('sector', value)}
          />
        </FormRow>
      </FormGroup>

      {Body && <Body />}

      <Heading level={4} className="contact-forms__section">
        {form.useCaseTitle}
      </Heading>
      {form.useCaseHints.map((hint) => (
        <Typography key={hint} size={100} className="contact-forms__hint">
          {hint}
        </Typography>
      ))}

      <textarea
        className="contact-forms__textarea"
        rows={4}
        placeholder={form.useCasePlaceholder}
        aria-label={form.useCasePlaceholder}
        value={shared.useCase}
        onChange={(event) => update('useCase', event.target.value)}
      />

      <hr className="contact-forms__divider" />

      <div className="contact-forms__consents">
        <Checkbox
          align="left"
          checked={shared.privacy}
          onChange={(checked) => update('privacy', checked)}
        >
          <span>
            I have read and accept the{' '}
            <ExternalTextLink href={PRIVACY_POLICY}>Privacy Policy</ExternalTextLink>. *
          </span>
        </Checkbox>
        <Checkbox
          align="left"
          checked={shared.marketing}
          onChange={(checked) => update('marketing', checked)}
        >
          <span>
            Yes please, I&rsquo;d like to receive useful Highcharts tips and product discounts.
          </span>
        </Checkbox>
      </div>

      <Button variant="success" size={300}>
        {form.submitLabel}
      </Button>
    </>
  );
}
