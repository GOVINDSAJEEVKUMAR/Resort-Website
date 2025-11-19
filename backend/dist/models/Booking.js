import { Schema, model } from 'mongoose';
const bookingSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 60,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 60,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 30,
    },
    arrivalDate: {
        type: Date,
        required: true,
    },
    departureDate: {
        type: Date,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
        min: 1,
        max: 12,
    },
    specialRequests: {
        type: String,
        trim: true,
        maxlength: 500,
    },
}, { timestamps: true, versionKey: false });
bookingSchema.index({ createdAt: -1 });
bookingSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform(_doc, ret) {
        const json = ret;
        json.id = ret._id;
        delete json._id;
        return json;
    },
});
const Booking = model('Booking', bookingSchema);
export default Booking;
//# sourceMappingURL=Booking.js.map