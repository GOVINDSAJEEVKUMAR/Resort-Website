import styled from 'styled-components';

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Heading = styled.h2`
  font-size: clamp(2rem, 4vw, 2.8rem);
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const Card = styled.figure`
  border-radius: 1.25rem;
  overflow: hidden;
  margin: 0;
  position: relative;
  box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12);

  &::after {
    content: attr(data-label);
    position: absolute;
    inset: auto 1rem 1rem;
    padding: 0.4rem 0.9rem;
    background: rgba(15, 23, 42, 0.6);
    color: white;
    border-radius: 999px;
    font-size: 0.85rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const galleryImages = [
  {
    label: 'Sunset Infinity Pool',
    src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Rainforest Villa',
    src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Wellness Pavilion',
    src: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb210cc?auto=format&fit=crop&w=1000&q=80',
  },
];

function Gallery() {
  return (
    <Section id="gallery">
      <Heading>Resort Gallery</Heading>
      <Grid>
        {galleryImages.map((image) => (
          <Card key={image.label} data-label={image.label}>
            <Image src={image.src} alt={image.label} loading="lazy" />
          </Card>
        ))}
      </Grid>
    </Section>
  );
}

export default Gallery;

