/**
 * @desc    Get current user profile
 * @route   GET /api/users/me
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  // The user object is attached to the request in the `protect` middleware
  if (req.user) {
    res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      plan: req.user.plan,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};