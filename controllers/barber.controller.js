const Barber = require('../models/barber.model')
const bcrypt = require('bcrypt')
const logger = require('../logger/logger')

exports.createBarber = async(req, res) => {
  const data = req.body;

  const saltOrRounds = 10;
  const passwordHash = await bcrypt.hash(data.password, saltOrRounds)

  const newBarber = new Barber({
    firstname: data.firstname,
    lastname: data.lastname,
    username: data.username,
    phone: data.phone,
    age: data.age,
    email: data.email,
    password: passwordHash,
    servicesOffered: data.servicesOffered
  })

  try{
    const result = await newBarber.save()
    logger.info('Barber created successfully')
    logger.warn('Barber created successfully')
    res.status(200).json({status: true, data: result})
  }catch(err){
    logger.error('Failed to create barber')
    res.status(400).json({status: false, data: err})
  }
}

exports.findAllBarbers = async(req, res) => {

  try{
    const result = await Barber.find().select('-password')
    logger.info('Barber fetched successfully')
    logger.warn('Barber fetched successfully')
    res.status(200).json({status: true, data: result})
  }catch(err){
    logger.error('Failed to fetch barbers')
    res.status(400).json({status: false, data: err})
  }
}

exports.findBarberByUsername = async(req, res) => {
  const username = req.params.username;
  
  try{
    const result = await Barber.findOne({username: username})
    logger.info('Barber with specific username fetched successfully')
    logger.warn('Barber with specific username fetched successfully')
    res.status(200).json({status: true, data: result})
  }catch(err){
    logger.error('Failed to fetch barber with specific username')
    res.status(400).json({status: false, data: err})
  }
}

exports.deleteBarberByUsername = async(req, res) => {
  const username = req.params.username;

  try{
    const result = await Barber.findOneAndDelete({username: username})

    if (!result) {
      return res.status(404).json({ status: false, message: `Barber "${username}" not found` });
    }
    
    logger.info('Barber with specific username deleted successfully')
    logger.warn('Barber with specific username deleted successfully')
    res.status(200).json({status: true, data: result})
  }catch(err){
    logger.error('Failed to delete barber with specific username')
    res.status(400).json({status: false, data: err})
  }
}

exports.updateBarberByUsername = async(req, res) => {
  const updateBarber = req.body;
  const username = req.params.username;
  const updateData = { ...req.body };

  if (updateData.password) {
    const saltRounds = 10;
    updateData.password = await bcrypt.hash(updateData.password, saltRounds);
  }

  try{
    const result = await Barber.findOneAndUpdate({username: username}, updateData, updateBarber, {new: true}).select('-password')

    if (!result) {
      return res.status(404).json({ status: false, message: `Barber "${username}" not found` });
    }
    logger.info('Barber with specific username updated successfully')
    logger.warn('Barber with specific username updated successfully')
    res.status(200).json({status: true, data: result})
  }catch(err){
    logger.error('Failed to update barber with specific username')
    res.status(400).json({status: false, data: err})
  }
}

