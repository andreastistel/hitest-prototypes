import { useState, useEffect, useRef } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Prototype1 from './prototypes/Prototype1';
import Prototype2 from './prototypes/Prototype2';
import './App.css';

function Placeholder({ name }: { name: string }) {
  return <div style={{ padding: 48 }}><h2>{name}</h2></div>;
}

const routes = [
  { path: '/prototype-1', label: 'Prototype 1', element: <Prototype1 /> },
  { path: '/prototype-2', label: 'Prototype 2', element: <Prototype2 /> },
  { path: '/prototype-3', label: 'Prototype 3', element: <Placeholder name="Prototype 3" /> },
  { path: '/prototype-4', label: 'Prototype 4', element: <Placeholder name="Prototype 4" /> },
];

function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="hamburger-wrapper" ref={ref}>
      <button
        className={`hamburger-btn${open ? ' open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="hamburger-menu">
          {routes.map(r => (
            <NavLink
              key={r.path}
              to={r.path}
              className={({ isActive }) => `hamburger-item${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {r.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <HamburgerMenu />
      <Routes>
        <Route path="/" element={<Navigate to="/prototype-1" replace />} />
        {routes.map(r => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}
      </Routes>
    </div>
  );
}
