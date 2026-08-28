import { Container, Heading, Typography } from 'highsoft-ui';
// import '../styles/my-prototype.scss';

/**
 * Copy this file to start a new prototype:
 *
 *   1. cp src/pages/_Template.tsx src/pages/MyPrototype.tsx
 *   2. Register it in src/prototypes.tsx (path + title + element).
 *   3. Optional: add src/styles/my-prototype.scss and import it here.
 *
 * The header, theme and router are already provided by App — this file only
 * renders the page body.
 */
export default function Template() {
  return (
    <Container>
      <Heading level={1}>Template</Heading>
      <Typography>Page body goes here.</Typography>
    </Container>
  );
}
