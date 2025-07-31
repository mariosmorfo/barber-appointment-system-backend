const Barber = require('../models/barber.model');
const User = require('../models/user.model');
const Appointment = require('../models/appointment.model')


exports.createAppointment = async(req, res) => {
  console.log('Create an appointment')

  const {barberId, serviceName, dateTime} = req.body;
  const  userId = req.user.id;

  try{
    const barber = await Barber.findById(barberId);

    if(!barber){
      return res.status(400).json({message: 'Barber not found'})
    }
    
    const doubleBooked = await Appointment.findOne({
      barberId,
      dateTime,
      status: { $in: ['booked', 'completed']}
  })

    if(doubleBooked){
      return res.status(400).json({message: 'This time appointment is already booked'})
    }
      const appointment = new Appointment({userId, barberId, serviceName, dateTime})
      await appointment.save()
      res.status(200).json({status: true, data: appointment})
    }catch(err){
      console.log('Error in booking appointment', err)
      res.status(500).json({ status: false, error: err})
    }
}

exports.findAllAppointments = async (req, res) => {
  console.log('Find all appointments')

  try{
    const appointment = await Appointment
    .find()
    .populate('barberId', 'firstname lastname username')
    .populate('userId', 'firstname lastname username')

    res.status(200).json({status: true, data: appointment})
  }catch(err) {
    console.log('Error in finding all appointments', err)
     res.status(400).json({status: false, data: err})
  }
}

exports.getAppointmentByCustomer = async(req, res) =>{
  console.log('Get customer appointments')

  try{
    const appointment = await Appointment
    .find({userId: req.user.id})
    .populate('barberId', 'firstname lastname servicesOffered')

    res.status(200).json({status: true, data: appointment})
  }catch(err){
    console.log('Error in fetching customer appointments')
    res.status(400).json({status: false, data: err})
  }
}

exports.getAppointmentByBarber = async(req, res) => {
  console.log('Get barber appointments')

  try{
    const appointment = await Appointment
    .find({barberId: req.user.id})
    .populate('userId', 'firstname lastname')
    .sort('dateTime')

    res.status(200).json({status: true, data: appointment})
  }catch(err){
    console.log('Error in fetching barber appointments')
    res.status(400).json({status: false, data: err})
  }
}

exports.cancelAppointment = async(req, res) => {
  console.log('Cancel appointment')

  const {id} = req.params;

  try{
    const appointment = await Appointment
    .findById(id)
    .populate('userId', 'firstname lastname')
    .populate('barberId', 'firstname lastname')

    if(!appointment){
      return res.status(400).json({message: 'Appointment not found'})
    }

    if (appointment.userId._id.toString() !== req.user.id) {
    return res.status(400).json({ message: 'Not your appointment' });
    }

    await appointment.deleteOne();
    res.status(200).json({message: 'Appointment canceled'})
  }catch(err){
    console.log('Error in canceling appointment')
    res.status(400).json({status: false, data: err})
  }
}

exports.updateAppointmentStatus = async (req, res) => {
  console.log('Update appointment status');
  const { id } = req.params;    
  const { status } = req.body;

  const allowed = ['booked','cancelled','completed'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const appt = await Appointment
      .findById(id)
      .populate('userId','firstname lastname')
      .populate('barberId','firstname lastname')

    if (!appt) {
      return res.status(400).json({ message: 'Appointment not found' })
    }

    appt.status = status;
    await appt.save();

    res.status(200).json({ status: true, data: appt })
  } catch (err) {
    console.error('Error updating status', err);
    return res.status(400).json({ message: err.message })
  }
};


