import type { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import sanitizeHtml from 'sanitize-html';
import Booking from '../models/Booking.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const sanitizeText = (value: string) =>
  sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
    textFilter(text) {
      return text.trim();
    },
  });

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Please correct the highlighted fields.',
      errors: errors.array(),
    });
  }

  const data = matchedData(req, { locations: ['body'] }) as {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    arrivalDate: Date;
    departureDate: Date;
    guests: number;
    specialRequests?: string;
  };

  const booking = await Booking.create({
    ...data,
    firstName: sanitizeText(data.firstName),
    lastName: sanitizeText(data.lastName),
    email: data.email.toLowerCase(),
    phone: sanitizeText(data.phone),
    specialRequests: data.specialRequests ? sanitizeText(data.specialRequests) : undefined,
  });

  return res.status(201).json(booking);
});

export const listBookings = asyncHandler(async (_req: Request, res: Response) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  return res.json(bookings);
});

