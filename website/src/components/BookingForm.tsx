import { useMemo, useState } from 'react';
import styled from 'styled-components';
import type { BookingFormData } from '../types';

const Section = styled.section`
  max-width: 960px;
  margin: 0 auto;
  background: white;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: 1.5rem;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.25);
`;

const Heading = styled.h2`
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  margin-top: 0;
  margin-bottom: 0.25rem;
`;

const Subheading = styled.p`
  margin: 0 0 2rem;
  color: #475569;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem 1.5rem;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-weight: 600;
  color: #0f172a;
`;

const Input = styled.input`
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.7);
  padding: 0.85rem 1rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.25);
  }
`;

const TextArea = styled.textarea`
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.7);
  padding: 0.85rem 1rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  grid-column: 1 / -1;

  &:focus {
    outline: none;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.25);
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  justify-self: flex-start;
  background: linear-gradient(135deg, #0ea5e9, #2563eb);
  color: white;
  border: none;
  border-radius: 999px;
  padding: 0.9rem 2.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(14, 165, 233, 0.35);
  }
`;

const Message = styled.p<{ kind: 'success' | 'error' }>`
  grid-column: 1 / -1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background: ${(props) =>
    props.kind === 'success' ? 'rgba(5, 150, 105, 0.1)' : 'rgba(248, 113, 113, 0.1)'};
  color: ${(props) => (props.kind === 'success' ? '#065f46' : '#b91c1c')};
  margin: 0;
`;

const initialForm: BookingFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  arrivalDate: '',
  departureDate: '',
  guests: 2,
  specialRequests: '',
};

function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
    [],
  );

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'guests' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (new Date(formData.arrivalDate) > new Date(formData.departureDate)) {
      setStatus('error');
      setMessage('Departure date must be after arrival date.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(`${apiBaseUrl}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload?.message ?? 'Unable to place booking right now.');
      }

      setStatus('success');
      setMessage('Thank you! Your reservation request has been received.');
      setFormData(initialForm);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unexpected error occurred.');
    }
  };

  return (
    <Section id="booking">
      <Heading>Reserve Your Stay</Heading>
      <Subheading>
        Share a few trip details and our concierge team will confirm availability within
        24 hours.
      </Subheading>
      <Form onSubmit={handleSubmit}>
        <Field>
          First Name
          <Input
            type="text"
            name="firstName"
            autoComplete="given-name"
            required
            value={formData.firstName}
            onChange={(event) => handleChange('firstName', event.target.value)}
          />
        </Field>
        <Field>
          Last Name
          <Input
            type="text"
            name="lastName"
            autoComplete="family-name"
            required
            value={formData.lastName}
            onChange={(event) => handleChange('lastName', event.target.value)}
          />
        </Field>
        <Field>
          Email
          <Input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(event) => handleChange('email', event.target.value)}
          />
        </Field>
        <Field>
          Phone
          <Input
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            value={formData.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
          />
        </Field>
        <Field>
          Arrival Date
          <Input
            type="date"
            name="arrivalDate"
            required
            value={formData.arrivalDate}
            onChange={(event) => handleChange('arrivalDate', event.target.value)}
          />
        </Field>
        <Field>
          Departure Date
          <Input
            type="date"
            name="departureDate"
            required
            value={formData.departureDate}
            onChange={(event) => handleChange('departureDate', event.target.value)}
          />
        </Field>
        <Field>
          Guests
          <Input
            type="number"
            min={1}
            max={12}
            name="guests"
            required
            value={formData.guests}
            onChange={(event) => handleChange('guests', event.target.value)}
          />
        </Field>
        <TextArea
          name="specialRequests"
          placeholder="Dietary preferences, celebrations, arrival time..."
          value={formData.specialRequests}
          onChange={(event) => handleChange('specialRequests', event.target.value)}
        />

        {status === 'success' && <Message kind="success">{message}</Message>}
        {status === 'error' && <Message kind="error">{message}</Message>}

        <SubmitButton type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting...' : 'Submit Booking Request'}
        </SubmitButton>
      </Form>
    </Section>
  );
}

export default BookingForm;

