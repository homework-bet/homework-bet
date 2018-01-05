const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    pool: { type: Schema.Types.ObjectId, ref: 'Pool' },
    amount: Number,
    method: { type: String, enum: ["venmo", "paypal"]},
    processedDate: Date,
    confirmationNumber: String,
    created: { type: Date, default: Date.now },
})

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;