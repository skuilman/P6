// Requires
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Check JWT
module.exports = (req, res, next) => {
  try {
    // Request and verify JWT
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const userId = decodedToken.userId;
    // Request and match JWT userId
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};