import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Booking } from '../types';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
    [],
  );

  const fetchBookings = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/bookings`);
      if (!response.ok) {
        throw new Error('Unable to fetch bookings.');
      }

      const payload = (await response.json()) as Booking[];
      setBookings(payload);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unexpected error.');
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { bookings, status, error, refetch: fetchBookings };
}

