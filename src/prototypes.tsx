import type { ReactElement } from 'react';
import type { SubHeaderItem } from 'highsoft-ui';
import ContactFormsOneForm from './pages/contact-forms/OneForm';
import ContactFormsSidebar from './pages/contact-forms/Sidebar';
import ContactFormsTabs from './pages/contact-forms/Tabs';
import PricingAndProduct from './pages/PricingAndProduct';

export type Prototype = {
  /** Route path, e.g. '/pricing'. Also the link used on the start page. */
  path: string;
  title: string;
  description?: string;
  /** Optional sub-header rendered by the shared <Header> while this route is active. */
  subItems?: Array<SubHeaderItem>;
  element: ReactElement;
};

/**
 * The contact-form layouts, offered as a sub-header on each of their routes so
 * you can flip between solutions without leaving the form you are looking at.
 */
const CONTACT_VARIANTS: Array<SubHeaderItem> = [
  { title: 'Sidebar', url: '/contact' },
  { title: 'Tabs', url: '/contact/tabs' },
  { title: 'One form', url: '/contact/one-form' },
];

/** Every prototype in one place — App builds the routes and the start page from this. */
export const PROTOTYPES: Array<Prototype> = [
  {
    path: '/pricing',
    title: 'Pricing and Products',
    description: 'Shop page with product catalog and cart sidebar.',
    element: <PricingAndProduct />,
  },
  {
    path: '/contact',
    title: 'Contact forms — sidebar',
    description: 'All four sales forms on one page, picked from a sidebar of cards.',
    subItems: CONTACT_VARIANTS,
    element: <ContactFormsSidebar />,
  },
  {
    path: '/contact/tabs',
    title: 'Contact forms — tabs',
    description: 'The same four forms behind a horizontal tab strip.',
    subItems: CONTACT_VARIANTS,
    element: <ContactFormsTabs />,
  },
  {
    path: '/contact/one-form',
    title: 'Contact forms — one form',
    description: 'One form; the purpose is a field that swaps the extras.',
    subItems: CONTACT_VARIANTS,
    element: <ContactFormsOneForm />,
  },
];
