export interface Booking {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  arrivalDate: string;
  departureDate: string;
  guests: number;
  specialRequests?: string;
  createdAt: string;
}

