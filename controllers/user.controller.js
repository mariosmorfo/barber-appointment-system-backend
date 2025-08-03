const User = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.createUser = async(req, res) => {
  console.log('Create user')

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
    res.status(200).json({status: true, data: result})
  }catch(err){
    console.log('Error for creating new user', err)
    res.status(400).json({status: false, data: err})
  }
}

exports.findAllUsers = async(req ,res) => {
  console.log('Find all users')
  
  try{
    const result = await User.find().select('-password')
    res.status(200).json({status: true, data: result})
  }catch(err){
    console.log('Error in finding all users', err)
    res.status(400).json({status: false, data: err})
  }
}

exports.findUserByUsername = async(req, res) => {
  const username = req.params.username;
  console.log('Find user with specific username: ', username)

  try{
    const result = await User.findOne({username: username})
    res.status(200).json({status: true, data: result})
  }catch(err){
    console.log('Error in finding user')
    res.status(400).json({status: false, data: err})
  }
}

exports.deleteUserByUsername = async(req, res) => {
  const username = req.params.username;
  console.log('Delete user with username: ', username)

  try{
    const result = await User.findOneAndDelete({username: username})
    res.status(200).json({status: true, data: result})
  }catch(err){
    console.log('Error in deleting user', err)
    res.status(400).json({status: false, data: err})
  }
}

exports.updateUserByUsername = async(req, res) => {
  const updateUser = req.body;
  const username = req.params.username;
  const updateData = { ...req.body }
  console.log('Update user')

  if (updateData.password) {
    const saltRounds = 10;
    updateData.password = await bcrypt.hash(updateData.password, saltRounds);
  }

  try{
    const result = await User.findOneAndUpdate({username: username}, updateData, updateUser, {new: true}).select('-password')
    res.status(200).json({status: true, data: result})
  }catch(err){
    console.log('Error in updating user')
    res.status(400).json({status: false, data: err})
  }
}