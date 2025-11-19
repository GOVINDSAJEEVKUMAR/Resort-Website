import styled, { createGlobalStyle } from 'styled-components';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Helvetica Neue', sans-serif;
    color: #0f172a;
    background-color: #f8fafc;
    line-height: 1.5;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background-color: #f8fafc;
  }

  #root {
    min-height: 100vh;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 0 1.5rem 4rem;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <Hero />
        <MainContent>
          <Services />
          <Gallery />
          <BookingForm />
        </MainContent>
        <Footer />
      </PageContainer>
    </>
  );
}

export default App;

