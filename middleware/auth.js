import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  // Get authorization header
  const authorization = req.headers.authorization;

  // Get access token from authorization

  if (!authorization) {
    return next({message:'Authorization header does not exist!',status:401})
  }
  const token = authorization.split(' ')[1];

  // Check if token exists
  if(!token)
  {
    return next({message:'Access token not provided!',status:401});
  }
  // Verify and decode the access token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    // Handle verify error
    if (error) {
      return next({message: error, status: 401});
    }
    //   Add decoded to request object
    req.auth = decoded;
    // Proceed to next handler
    next();
  });
};
