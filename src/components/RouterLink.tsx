import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Link implementation handed to highsoft-ui's <Header>. It rewrites the real
 * highcharts.com URLs baked into the header onto local prototype routes, so
 * clicking around the header stays inside the prototype.
 */
const RouterLink = ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  if (href === 'https://www.highcharts.com/') {
    return <Link to="/" {...(props as any)} />;
  }
  if (href === 'https://shop.highcharts.com/') {
    return <Link to="/pricing" {...(props as any)} />;
  }
  if (href?.startsWith('/')) {
    return <Link to={href} {...(props as any)} />;
  }
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a href={href} {...(props as any)} />;
};

export default RouterLink;
