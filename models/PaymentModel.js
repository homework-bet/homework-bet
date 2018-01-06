const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    pool: { type: Schema.Types.ObjectId, ref: 'Pool' },
    amount: {type: Number, required: true, min: 0},
    method: { type: String, enum: ["venmo", "paypal"], required: true},
    processedDate: {type: Date, required: true},
    confirmationNumber: {type: String, required: true},
    created: { type: Date, default: Date.now },
})

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;
