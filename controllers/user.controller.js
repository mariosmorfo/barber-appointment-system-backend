const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const logger = require('../logger/logger')

exports.createUser = async(req, res) => {

  const data = req.body;

  const saltOrRounds = 10;
  const passwordHash = await bcrypt.hash(data.password, saltOrRounds)

  const newUser = new User({
    firstname: data.firstname,
    lastname: data.lastname,
    username: data.username,
    email: data.email,
    password: passwordHash,
    phone: data.phone,
    age: data.age,
    role: data.role || 'CUSTOMER',
    address: data.address
  })

  try{
    const result = await newUser.save()
    logger.info('User created successfully')
    logger.warn('User created successfully')
    res.status(200).json({status: true, data: result})
  }catch(err){
    logger.error('Failed to create user')
    res.status(400).json({status: false, data: err})
  }
}

exports.findAllUsers = async(req ,res) => {
  
  try{
    const result = await User.find().select('-password')
    logger.info('Users fetched successfully')
    logger.warn('Users fetched successfully')
    res.status(200).json({status: true, data: result})
  }catch(err){
    logger.error('Failed to fetch users')
    res.status(400).json({status: false, data: err})
  }
}

exports.findUserByUsername = async(req, res) => {
  const username = req.params.username;

  try{
    const result = await User.findOne({username: username})
    logger.info('User with specific username fetched successfully')
    logger.warn('User with specific username fetched successfully')
    res.status(200).json({status: true, data: result})
  }catch(err){
     logger.error('Failed to fetch user with specific username')
    res.status(400).json({status: false, data: err})
  }
}

exports.deleteUserByUsername = async(req, res) => {
  const username = req.params.username;

  try{
    const result = await User.findOneAndDelete({username: username})
    logger.info('User with specific username deleted successfully')
    logger.warn('User with specific username deleted successfully')
    res.status(200).json({status: true, data: result})
  }catch(err){
    logger.error('Failed to delete user with specific username')
    res.status(400).json({status: false, data: err})
  }
}

exports.updateUserByUsername = async(req, res) => {
  const updateUser = req.body;
  const username = req.params.username;
  const updateData = { ...req.body }

  if (updateData.password) {
    const saltRounds = 10;
    updateData.password = await bcrypt.hash(updateData.password, saltRounds);
  }

  try{
    const result = await User.findOneAndUpdate({username: username}, updateData, updateUser, {new: true}).select('-password')
    logger.info('User with specific username updated successfully')
    logger.warn('User with specific username updated successfully')
    res.status(200).json({status: true, data: result})
  }catch(err){
    logger.error('Failed to update user with specific username')
    res.status(400).json({status: false, data: err})
  }
}