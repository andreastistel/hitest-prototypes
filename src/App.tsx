import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from 'highsoft-ui';
import 'highsoft-ui/css';
import './App.css';
import RouterLink from './components/RouterLink';
import StartPage from './pages/StartPage';
import { PROTOTYPES } from './prototypes';

function App() {
  const { pathname } = useLocation();
  const active = PROTOTYPES.find(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`)
  );

  return (
    <div>
      <Header link={RouterLink} pathname={pathname} subItems={active?.subItems} />
      <Routes>
        <Route path="/" element={<StartPage />} />
        {PROTOTYPES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
