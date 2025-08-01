const express = require('express')
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles;
const appointmentController = require('../controllers/appointment.controller')

router.get('/', verifyToken, verifyRoles('ADMIN'), appointmentController.findAllAppointments)
router.get('/barber/:barberId', verifyToken, appointmentController.getAppointmentByBarber)
router.get('/user/:userId', verifyToken, appointmentController.getAppointmentByCustomer)
router.post('/create', verifyToken, appointmentController.createAppointment)
router.delete('/cancel/:id', verifyToken, appointmentController.cancelAppointment)
router.patch('/status/:id', verifyToken, verifyRoles('BARBER'), appointmentController.updateAppointmentStatus)

module.exports = router;


