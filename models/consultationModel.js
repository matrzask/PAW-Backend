const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    type: { type: String, required: true },
    patient: { type: String, required: true },
    patientGender: { type: String, required: true },
    patientAge: { type: Number, required: true },
    details: { type: String }
});

ConsultationSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

ConsultationSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Consultation', ConsultationSchema);