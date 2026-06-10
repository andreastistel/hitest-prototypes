import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Header, Container, Heading } from 'highsoft-ui';
import 'highsoft-ui/css';
import './App.css';
import PricingAndProduct from './pages/PricingAndProduct';

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

function StartPage() {
  return (
    <Container>
      <Heading level={1} style={{ textAlign: 'center', fontSize: '7rem', marginTop: '20vh' }}>Start page</Heading>
    </Container>
  );
}

function App() {
  return (
    <div>
      <Header link={RouterLink} />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/pricing" element={<PricingAndProduct />} />
      </Routes>
    </div>
  );
}

export default App;
