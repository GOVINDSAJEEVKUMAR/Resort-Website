import styled from 'styled-components';

const HeroSection = styled.header`
  position: relative;
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 0 1.5rem;
  text-align: center;
  background-image: linear-gradient(
      rgba(7, 11, 30, 0.7),
      rgba(7, 11, 30, 0.65)
    ),
    url('https://images.unsplash.com/photo-1501117716987-c8e1ecb210cc?auto=format&fit=crop&w=1800&q=80');
  background-size: cover;
  background-position: center;
`;

const HeroContent = styled.div`
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin: 0;
  letter-spacing: 1px;
`;

const Tagline = styled.p`
  font-size: 1.1rem;
  opacity: 0.92;
`;

const BookButton = styled.a`
  align-self: center;
  background: #e2b714;
  color: #0f172a;
  padding: 0.9rem 2.5rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  }
`;

function Hero() {
  return (
    <HeroSection>
      <HeroContent>
        <Title>Serenity Cove Resort</Title>
        <Tagline>
          Escape to an eco-luxury sanctuary hugged by nature. Bespoke villas,
          curated adventures, and mindful wellness await.
        </Tagline>
        <BookButton href="#booking">Book Now</BookButton>
      </HeroContent>
    </HeroSection>
  );
}

export default Hero;

