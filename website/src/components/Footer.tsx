import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #0f172a;
  color: rgba(248, 250, 252, 0.95);
  padding: 2.5rem 1.5rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
`;

const Brand = styled.div`
  max-width: 320px;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
`;

const Contact = styled.address`
  font-style: normal;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  color: rgba(248, 250, 252, 0.8);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SocialLink = styled.a`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(248, 250, 252, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(248, 250, 252, 0.25);
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <Brand>
          <Title>Serenity Cove Resort</Title>
          <p>Km 45 Coastal Highway, Sunrise Bay, Costa Rica</p>
          <p>Open daily · 24/7 concierge</p>
        </Brand>
        <Contact>
          <strong>Contact</strong>
          <span>reservations@serenitycove.com</span>
          <span>+1 (305) 555-0118</span>
        </Contact>
        <div>
          <strong>Follow</strong>
          <SocialLinks>
            <SocialLink href="https://instagram.com" target="_blank" rel="noreferrer">
              IG
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" rel="noreferrer">
              FB
            </SocialLink>
            <SocialLink href="https://pinterest.com" target="_blank" rel="noreferrer">
              PT
            </SocialLink>
          </SocialLinks>
        </div>
      </FooterContent>
    </FooterWrapper>
  );
}

export default Footer;

