const jwt = require('jsonwebtoken');

function middleware(req, res, next) {
  try {

    const authHeader = req.headers['authorization']; 
    if (!authHeader) {
      return res.status(400).json({ message: 'Header not found' });
    }

   
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token not found' });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
}

module.exports = middleware;
