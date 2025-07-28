const mongoose = require("mongoose")
const Schema = mongoose.Schema;

let addressSchema = new Schema({
  city: {type: String},
  street: {type: String}
}, {_id: false})

let userSchema = new Schema({
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
    passwordHash: {
      type: String,
      required: [true, "Password is required field"],
      select: false
    },
    phone: {
      type: String,
    },
    age: {
      type: String
    },
    role: {
      type: String,
      enum : ['ADMIN', 'BARBER', 'CUSTOMER'],
      default : 'CUSTOMER'
    },
    address: addressSchema
},
{timestamps: true})

module.exports = mongoose.model("User", userSchema)