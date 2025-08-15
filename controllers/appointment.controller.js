const Barber = require('../models/barber.model');
const User = require('../models/user.model');
const Appointment = require('../models/appointment.model')
const logger = require('../logger/logger')


exports.createAppointment = async(req, res) => {
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
      logger.info('Appointment created successfully')
      logger.warn('Appointment created successfully')
      res.status(200).json({status: true, data: appointment})
    }catch(err){
      logger.error('Failed to create appointment')
      res.status(400).json({ status: false, error: err})
    }
}

exports.findAllAppointments = async (req, res) => {

  try{
    const appointment = await Appointment
    .find()
    .populate('barberId', 'firstname lastname username')
    .populate('userId', 'firstname lastname username')

    logger.info('Appointment fetched successfully')
    logger.warn('Appointment fetched successfully')
    res.status(200).json({status: true, data: appointment})
  }catch(err) {
    logger.error('Failed to fetch appointments')
    res.status(400).json({status: false, data: err})
  }
}

exports.getAppointmentByCustomer = async(req, res) =>{

  try{
    const appointment = await Appointment
    .find({userId: req.user.id})
    .populate('barberId', 'firstname lastname servicesOffered')

    logger.info('Appointment with specific customer fetched successfully')
    logger.warn('Appointment with specific customer fetched successfully')
    res.status(200).json({status: true, data: appointment})
  }catch(err){
    logger.error('Failed to fetch appointment with specific customer')
    res.status(400).json({status: false, data: err})
  }
}

exports.getAppointmentByBarber = async(req, res) => {
  const {barberId} = req.params;

  try{
    const appointment = await Appointment
    .find({barberId})
    .populate('userId', 'firstname lastname')
    .populate('barberId', 'firstname lastname')
    .sort('dateTime')

    logger.info('Appointment with specific customer fetched successfully')
    logger.warn('Appointment with specific customer fetched successfully')
    res.status(200).json({status: true, data: appointment})
  }catch(err){
    logger.error('Failed to fetch appointment with specific customer')
    res.status(400).json({status: false, data: err})
  }
}

exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;
  const { id: authId, role } = req.user;

  try {
    const appointment = await Appointment.findById(id)
      .populate('userId', 'firstname lastname')
      .populate('barberId', 'firstname lastname');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const isCustomer = role === 'CUSTOMER' && appointment.userId?._id?.toString() === authId;
    const isBarber   = role === 'BARBER'   && appointment.barberId?._id?.toString() === authId;

    if (!(isCustomer || isBarber)) {
      return res.status(403).json({ message: 'Not allowed to cancel this appointment' });
    }

    await appointment.deleteOne();
    logger.info('Appointment deleted successfully');
    return res.status(200).json({ status: true, message: 'Appointment canceled' });
  } catch (err) {
    logger.error('Failed to delete appointment', { err });
    return res.status(400).json({ status: false, message: 'Failed to delete appointment' });
  }
};


exports.updateAppointmentStatus = async (req, res) => {
  const {id} = req.params;    
  const {status} = req.body;

  const allowed = ['booked','cancelled','completed'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const appointment = await Appointment
      .findById(id)
      .populate('userId','firstname lastname')
      .populate('barberId','firstname lastname')

    if (!appointment) {
      return res.status(400).json({ message: 'Appointment not found'})
    }

    appointment.status = status;
    await appointment.save();
    
    logger.info('Appointment status updated successfully')
    logger.warn('Appointment status updated successfully')
    res.status(200).json({ status: true, data: appointment })
  } catch (err) {
    logger.error('Failed to update appointment status')
    res.status(400).json({status:false, data: err.message })
  }
};


