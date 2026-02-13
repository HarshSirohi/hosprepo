export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  // Determine the cookie name based on the user's role
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';

  // Ensure COOKIE_EXPIRE is a number (days). Fallback to 7 days if not set.
  const expireDays = Number(process.env.COOKIE_EXPIRE) || 7;
  const maxAge = expireDays * 24 * 60 * 60 * 1000; // milliseconds

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      maxAge,
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

