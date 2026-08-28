import type { ReactElement } from 'react';
import type { SubHeaderItem } from 'highsoft-ui';
import ContactForms from './pages/ContactForms';
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
    title: 'Contact forms',
    description: 'All four sales forms on one page, picked from a sidebar.',
    element: <ContactForms />,
  },
];
