import styled from 'styled-components';

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  text-align: center;
  margin-bottom: 1rem;
`;

const Intro = styled.p`
  text-align: center;
  max-width: 720px;
  margin: 0 auto 2.5rem;
  color: #475569;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.article`
  background: white;
  padding: 1.75rem;
  border-radius: 1.25rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.07);
  border: 1px solid rgba(148, 163, 184, 0.3);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
`;

const CardText = styled.p`
  margin: 0;
  color: #475569;
`;

const services = [
  {
    title: 'Accommodation',
    description:
      'Ocean-view villas and rainforest suites, each curated with handcrafted interiors, private plunge pools, and concierge service.',
  },
  {
    title: 'Adventure Activities',
    description:
      'Guided jungle treks, dawn kayaking, reef snorkeling, and hot-air balloon escapades tailored to every thrill seeker.',
  },
  {
    title: 'Wellness & Spa',
    description:
      'Holistic spa rituals, Ayurveda-inspired therapies, and mindful movement classes led by world-class practitioners.',
  },
];

function Services() {
  return (
    <Section id="services">
      <Heading>Signature Experiences</Heading>
      <Intro>
        Crafted itineraries that balance barefoot luxury with immersive
        adventures so every stay feels unforgettable.
      </Intro>
      <Cards>
        {services.map((service) => (
          <Card key={service.title}>
            <CardTitle>{service.title}</CardTitle>
            <CardText>{service.description}</CardText>
          </Card>
        ))}
      </Cards>
    </Section>
  );
}

export default Services;

