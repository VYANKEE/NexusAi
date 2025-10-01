import jwt from 'jsonwebtoken';

/**
 * Generates a JWT for a given user ID.
 * @param {string} userId - The user's MongoDB ObjectId.
 * @returns {string} The generated JSON Web Token.
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};