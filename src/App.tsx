import { useState } from 'react';
import Prototype1 from './prototypes/Prototype1';

function Placeholder({ name }: { name: string }) {
  return <div style={{ padding: 48 }}><h2>{name}</h2></div>;
}

const tabs: { label: string; component: React.ReactNode }[] = [
  { label: 'Prototype 1', component: <Prototype1 /> },
  { label: 'Prototype 2', component: <Placeholder name="Prototype 2" /> },
  { label: 'Prototype 3', component: <Placeholder name="Prototype 3" /> },
  { label: 'Prototype 4', component: <Placeholder name="Prototype 4" /> },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <nav className="proto-nav">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`proto-nav-item${activeTab === index ? ' active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {tabs[activeTab].component}
    </div>
  );
}
