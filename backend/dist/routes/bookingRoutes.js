import { Router } from 'express';
import { body } from 'express-validator';
import { createBooking, listBookings } from '../controllers/bookingController.js';
const router = Router();
const bookingValidators = [
    body('firstName')
        .trim()
        .isLength({ min: 2, max: 60 })
        .withMessage('First name must be between 2 and 60 characters.')
        .escape(),
    body('lastName')
        .trim()
        .isLength({ min: 2, max: 60 })
        .withMessage('Last name must be between 2 and 60 characters.')
        .escape(),
    body('email').isEmail().withMessage('A valid email address is required.').normalizeEmail(),
    body('phone')
        .trim()
        .isLength({ min: 6, max: 30 })
        .withMessage('Phone number must be between 6 and 30 characters.')
        .escape(),
    body('guests')
        .isInt({ min: 1, max: 12 })
        .withMessage('Guests must be between 1 and 12.')
        .toInt(),
    body('arrivalDate')
        .isISO8601()
        .withMessage('Arrival date is required.')
        .toDate(),
    body('departureDate')
        .isISO8601()
        .withMessage('Departure date is required.')
        .toDate()
        .custom((value, { req }) => {
        if (new Date(value) <= new Date(req.body.arrivalDate)) {
            throw new Error('Departure date must be after arrival date.');
        }
        return true;
    }),
    body('specialRequests')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Special requests must be under 500 characters.')
        .trim()
        .escape(),
];
router.post('/', bookingValidators, createBooking);
router.get('/', listBookings);
export default router;
//# sourceMappingURL=bookingRoutes.js.map