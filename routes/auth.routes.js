const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)
router.post('/barber-login', authController.barberLogin)

module.exports = router;