import styled, { createGlobalStyle } from 'styled-components';
import BookingTable from './components/BookingTable';
import { useBookings } from './hooks/useBookings';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Helvetica Neue', sans-serif;
    background: #e2e8f0;
    color: #0f172a;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc, #dbeafe);
  }
`;

const Page = styled.div`
  min-height: 100vh;
  padding: 3rem min(4vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
`;

const Subtitle = styled.p`
  margin: 0.25rem 0 0;
  color: #475569;
`;

const RefreshButton = styled.button`
  border: none;
  background: #0ea5e9;
  color: white;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(14, 165, 233, 0.35);
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
`;

const Alert = styled.div<{ kind: 'info' | 'error' }>`
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  color: ${(props) => (props.kind === 'info' ? '#0f172a' : '#b91c1c')};
  background: ${(props) =>
    props.kind === 'info' ? 'rgba(14, 165, 233, 0.15)' : 'rgba(248, 113, 113, 0.2)'};
  border: 1px solid
    ${(props) => (props.kind === 'info' ? 'rgba(14, 165, 233, 0.5)' : 'rgba(248, 113, 113, 0.5)')};
`;

function App() {
  const { bookings, status, error, refetch } = useBookings();
  const isLoading = status === 'loading';

  return (
    <>
      <GlobalStyles />
      <Page>
        <Header>
          <div>
            <Title>Bookings Dashboard</Title>
            <Subtitle>
              {status === 'success'
                ? `${bookings.length} reservations`
                : 'Monitor every incoming resort stay request'}
            </Subtitle>
          </div>
          <RefreshButton onClick={refetch} disabled={isLoading}>
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </RefreshButton>
        </Header>

        {error && <Alert kind="error">{error}</Alert>}
        {!error && status === 'loading' && <Alert kind="info">Loading latest bookings…</Alert>}

        <BookingTable bookings={bookings} isLoading={isLoading} />
      </Page>
    </>
  );
}

export default App;

