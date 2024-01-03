const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  if (!token) return res.status(401).send('Access Denied: No Token Provided!');

  try {
    const verified = jwt.verify(token, process.env.SECRETKEY);
    req.user = verified; // Add user payload to request
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

exports.verifyToken = verifyToken;