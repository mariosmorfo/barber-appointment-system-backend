const express = require('express');
const barberController = require('../controllers/barber.controller')
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles;

router.get('/', verifyToken, barberController.findAllBarbers)
router.get('/:username', verifyToken, barberController.findBarberByUsername)
router.post('/create', verifyToken, verifyRoles('ADMIN'), barberController.createBarber)
router.patch('/update/:username', verifyToken, verifyRoles('ADMIN'), barberController.updateBarberByUsername)
router.delete('/delete/:username', verifyToken, verifyRoles('ADMIN'), barberController.deleteBarberByUsername)

module.exports = router;