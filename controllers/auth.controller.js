const bcrypt = require('bcrypt');
const authService = require('../services/auth.service');
const User = require('../models/user.model');

exports.login = async (req, res) => {
  console.log('Login user', req.body);

  const username = req.username.body;
  const password = req.password.body;

  try {

    const result = await User.findOne(
      { username },
      { username: 1, email: 1, password: 1, role: 1 }
    );

    if (!result) {
      return res.status(404).json({ status: false, data: 'User not found. Please register first.' });
    }

    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, data: 'Invalid credentials.' });
    }

    const token = authService.generateAccesToken({
      _id:      result._id,
      username: result.username,
      email:    result.email,
      role:     result.role
    });

    return res.status(200).json({ status: true, data: token });
  } catch (err) {
    console.error('Problem in logging', err);
    return res.status(500).json({ status: false, data: 'Server error' });
  }
}
