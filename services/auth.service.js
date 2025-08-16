const jwt = require('jsonwebtoken')

function generateAccesToken(user){
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  }

  const secret = process.env.JWT_SECRET;

  const options = {expiresIn: '2h'}

  return jwt.sign(payload, secret,options)
}

function verifyAccessToken(token) {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Verify token', payload)
    return { verified: true, payload };
  } catch (err) {
    return { verified: false, error: err.message };
  }
}

module.exports = {generateAccesToken, verifyAccessToken}