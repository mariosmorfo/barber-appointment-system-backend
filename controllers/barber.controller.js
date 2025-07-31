const Barber = require('../models/barber.model')
const bcrypt = require('bcrypt')

exports.createBarber = async(req, res) => {
  console.log('Create Barber')

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
    res.status(200).json({status: true, data: result})
  }catch(err){
    console.log('Error for creating new barber')
    res.status(400).json({status: false, data: err})

  }
}

exports.findAllBarbers = async(req, res) => {
  console.log('Find all barbers')

  try{
    const result = await Barber.find().select('-password')
    res.status(200).json({status: true, data: result})
  }catch(err){
    console.log('Error in finding all barbers')
    res.status(400).json({status: false, data: err})

  }
}

exports.findBarberByUsername = async(req, res) => {
  const username = req.params.username;
  console.log('Find barber with spesific username')

  try{
    const result = await Barber.findOne({username: username})
    res.status(200).json({status: true, data: result})
  }catch(err){
    console.log('Error in finding barber')
    res.status(400).json({status: false, data: err})
  }
}

exports.deleteBarberByUsername = async(req, res) => {
  const username = req.params.username;
  console.log('Delete barber with username:' , username)

  try{
    const result = await Barber.findOneAndDelete({username: username})
    res.status(200).json({status: true, data: result})
  }catch(err){
    console.log('Error in deleting barber')
    res.status(400).json({status: false, data: err})
  }
}

exports.updateBarberByUsername = async(req, res) => {
  const updateBarber = req.body;
  const username = req.params.username;
  console.log('Update Barber')

  try{
    const result = await Barber.findOneAndUpdate({username: username}, updateBarber, {new: true}).select('-password')
    res.status(200).json({status: true, data: result})
  }catch(err){
    console.log('Error in updating barber')
    res.status(400).json({status: false, data: err})
  }
}

