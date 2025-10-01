import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if the Authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Get token from header (it's in the format "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using our secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Get user from the token's ID and attach it to the request object
      // We exclude the password from the user object we attach
      req.user = await User.findById(decoded.id).select('-passwordHash');
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // 5. Move on to the next step (the actual route controller)
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};