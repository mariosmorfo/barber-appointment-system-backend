const mongoose = require("mongoose")
const Schema = mongoose.Schema

let appointmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  barberId: {
    type: Schema.Types.ObjectId,
    ref: "Barber",
    required: true
  },
  serviceName: {
    type: String,
    required: true,
    trim: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled', 'completed'],
    default: 'booked'
  }
},
{ collection: 'appointments',
  versionKey: false,
  timestamps: true}
)

module.exports = mongoose.model("Appointment",appointmentSchema)