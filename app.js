const express = require('express');
const app = express();  
const cors = require('cors');

const user = require('./routes/user.routes')
const auth = require('./routes/auth.routes')
const barber = require('./routes/barber.routes')
const appointment = require('./routes/appointment.routes');


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors({
  origin: "*"
}))

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/barber', barber)
app.use('/api/appointment', appointment)


module.exports = app;