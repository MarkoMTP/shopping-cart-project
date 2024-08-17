import styled from 'styled-components';

const StyledH1 = styled.a`
  font-size: 5rem;
  color: red;
`;

export function HomePage() {
  return (
    <>
      <StyledH1>Welcome</StyledH1>
      <h2>This is the HOME PAGE(fake)</h2>
      <p>Its just for practice</p>
    </>
  );
}
