import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from 'highsoft-ui';
import 'highsoft-ui/css';
import './App.css';
import RouterLink from './components/RouterLink';
import StartPage from './pages/StartPage';
import { PROTOTYPES } from './prototypes';

function App() {
  const { pathname } = useLocation();
  // Exact match wins, so /contact does not shadow /contact/tabs.
  const active =
    PROTOTYPES.find(({ path }) => path === pathname) ??
    PROTOTYPES.find(({ path }) => pathname.startsWith(`${path}/`));

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
