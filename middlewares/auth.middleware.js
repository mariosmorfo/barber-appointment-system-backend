const { verifyAccessToken } = require('../services/auth.service');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: false, message: 'No token provided' });
  }

  const result = verifyAccessToken(token);

  if (result.verified) {
    req.user = result.payload;   
    return next();
  } else {
    return res
      .status(401)
      .json({ status: false, message: 'Invalid token: ' + result.error });
  }
}

function verifyRoles(allowedRole) {
  return (req, res, next) => {
    const userRole = req.user && req.user.role;
    if (!userRole) {
      return res.status(403).json({ status: false, message: 'No role found' });
    }
    if (userRole !== allowedRole) {
      return res
        .status(403)
        .json({ status: false, message: 'Insufficient permissions' });
    }
    next();
  };
}

module.exports = { verifyToken, verifyRoles };
