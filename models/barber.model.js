const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let barberSchema = new Schema({
  firstname: {
      type: String,
      required: [true, "Firstname is required field"],
      max: 20,
      lowercase: true,
      trim: true
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required field"],
      max: 20,
      lowercase: true,
      trim: true
    },
     username: {
      type: String,
      required: [true, "Username is required field"],
      unique : true,
      max: 20,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: [true, "Username is required field"],
    },
    age: {
      type: String
    },
     email: {
      type: String,
      required: [true, "Email is required field"],
      unique: true,
      max: 20,
      lowercase: true,
      trim: true,
       match: [ /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
       "Please fill a valid email address" ]
    },
    password: {
      type: String,
      required: [true, "Password is required field"],
      select: false
    },
    servicesOffered: [{
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      max: [50, 'Service name cannot exceed 50 characters']
    },
    duration: {
      type: Number,
      required: [true, 'Service duration is required'], 
      min: [1, 'Duration must be at least 1 minute']
    },
    price: {
      type: Number,
      required: [true, 'Service price is required'],
      min: [0, 'Price must be a non-negative number']
    }
  }],
},
{ collection: 'barbers',
  versionKey: false,
  timestamps: true})

module.exports = mongoose.model("Barber", barberSchema)