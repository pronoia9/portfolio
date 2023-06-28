import { styled } from 'styled-components';

import { dataStore } from '../../../store/dataStore';
import { rem } from '../../../utils';

export const HeroHeading = () => {
  const data = dataStore((state) => state.hero.heading);

  return (
    <Container className='mb-15 hero-heading'>
      {data.map((text, index) => (
        <h1 key={`hero-heading-${index}`}>{text}</h1>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  transition: 0.3s ease-in-out;
  
  &:hover {
    text-shadow: ${rem(0.1)} ${rem(0.1)} ${rem(2)} var(--c-accent-2);
    transform: scale(1.01);
  }

  @media (max-width: ${rem(1600)}) {
    font-size: ${rem(62)};
  }

  @media (max-width: ${rem(1400)}) {
    font-size: ${rem(56)};
  }

  @media (max-width: ${rem(700)}) {
    font-size: ${rem(46)};
  }
`;