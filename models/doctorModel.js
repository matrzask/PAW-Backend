const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
});

DoctorSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

DoctorSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Doctor', DoctorSchema);