import { Link } from 'react-router-dom';
import { Container, Heading, Typography } from 'highsoft-ui';
import { PROTOTYPES } from '../prototypes';
import '../styles/start-page.scss';

export default function StartPage() {
  return (
    <Container>
      <div className="start-page">
        <Heading level={1}>Prototypes</Heading>
        <ul className="start-page__list">
          {PROTOTYPES.map(({ path, title, description }) => (
            <li key={path}>
              <Link to={path} className="start-page__card">
                <Heading level={3}>{title}</Heading>
                {description && <Typography size={200}>{description}</Typography>}
                <code className="start-page__path">{path}</code>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
