import type { ReactElement } from 'react';
import type { SubHeaderItem } from 'highsoft-ui';
import ContactFormsOneForm from './pages/contact-forms/OneForm';
import ContactFormsSidebar from './pages/contact-forms/Sidebar';
import ContactFormsTabs from './pages/contact-forms/Tabs';
import PricingAndProduct from './pages/PricingAndProduct';
import SoftwareUsage from './pages/SoftwareUsage';
import SoftwareUsageVariantThree from './pages/software-usage/VariantThree';
import SoftwareUsageVariantTwo from './pages/software-usage/VariantTwo';

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

/** The two software-usage layouts, offered as a sub-header on both routes. */
const USAGE_VARIANTS: Array<SubHeaderItem> = [
  { title: 'Type 1', url: '/software-usage' },
  { title: 'Type 2', url: '/software-usage/v2' },
  { title: 'Type 3', url: '/software-usage/v3' },
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
    path: '/software-usage',
    title: 'How will the software be used? — type 1',
    description: 'Usage and licensing questions, built on a section from the pricing page.',
    subItems: USAGE_VARIANTS,
    element: <SoftwareUsage />,
  },
  {
    path: '/software-usage/v2',
    title: 'How will the software be used? — type 2',
    description: 'Large radio boxes, a removable list of named applications, and an attached internal-use bar.',
    subItems: USAGE_VARIANTS,
    element: <SoftwareUsageVariantTwo />,
  },
  {
    path: '/software-usage/v3',
    title: 'How will the software be used? — type 3',
    description: 'Every option on its own full-width row, description right-aligned.',
    subItems: USAGE_VARIANTS,
    element: <SoftwareUsageVariantThree />,
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
