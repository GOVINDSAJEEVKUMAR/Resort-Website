import styled from 'styled-components';
import type { Booking } from '../types';

const TableWrapper = styled.div`
  background: white;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.2);
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;

  th {
    text-align: left;
    font-size: 0.85rem;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding-bottom: 0.75rem;
  }

  td {
    border-top: 1px solid rgba(148, 163, 184, 0.25);
    padding: 0.9rem 0;
    vertical-align: top;
  }
`;

const GuestName = styled.div`
  font-weight: 600;
`;

const Muted = styled.p`
  margin: 0.15rem 0 0;
  font-size: 0.9rem;
  color: #64748b;
`;

const Badge = styled.span`
  display: inline-flex;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: #1d4ed8;
  font-weight: 600;
  font-size: 0.85rem;
`;

const NoData = styled.div`
  text-align: center;
  padding: 2rem 0;
  color: #94a3b8;
`;

interface BookingTableProps {
  bookings: Booking[];
  isLoading: boolean;
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

function BookingTable({ bookings, isLoading }: BookingTableProps) {
  return (
    <TableWrapper>
      {bookings.length === 0 && !isLoading ? (
        <NoData>No bookings yet.</NoData>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Contact</th>
              <th>Dates</th>
              <th>Guests</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>
                  <GuestName>
                    {booking.firstName} {booking.lastName}
                  </GuestName>
                  <Muted>Requested {dateFormatter.format(new Date(booking.createdAt))}</Muted>
                </td>
                <td>
                  <div>{booking.email}</div>
                  <Muted>{booking.phone}</Muted>
                </td>
                <td>
                  <div>{dateFormatter.format(new Date(booking.arrivalDate))}</div>
                  <Muted>to {dateFormatter.format(new Date(booking.departureDate))}</Muted>
                </td>
                <td>
                  <Badge>{booking.guests} guests</Badge>
                </td>
                <td>
                  {booking.specialRequests ? (
                    <p>{booking.specialRequests}</p>
                  ) : (
                    <Muted>—</Muted>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </TableWrapper>
  );
}

export default BookingTable;

