import { UserModel } from "../models/user.js";
import { loginUserValidator, registerUserValidator } from "../validators/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async(req,res,next) => {
  try {
    const { error, value } = registerUserValidator.validate(req.body,{abortEarly:false});
  
    if (error) {
      return next({
        status: 400,
        message: "Validation failed",
        details: error.details,
      });
    }
  
    // Check if user does not exist already
    const existingUser = await UserModel.findOne({
      $or: [{ name: value.name }, { email: value.email }],
    });
  
    if (existingUser)
      return next({ status: 400, message: "Email already in use. Please log in or use a different email." });
  
    const passwordHash = bcrypt.hashSync(value.password, 10);
  
    const user = await UserModel.create({
      ...value,
      password: passwordHash,
    });
  
    // Return Response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

export const loginUser = async(req,res,next) => {
try {
  // Validate user information
    const { error, value } = loginUserValidator.validate(req.body);

    if (error) {
      return next({
        status: 400,
        message: "Validation failed",
        details: error.details,
      });
    }
  
    // Find matching user record in database
    const user = await UserModel.findOne({
      $or: [{ name: value.name }, { email: value.email }],
    });
  
    if (!user) {
      return next({status:404, message: "User does not exist!"});
    }
  
    // Compare incoming password with saved password
    const comparePassword = bcrypt.compareSync(value.password, user.password);
  
    if(!comparePassword) return next({status:401, message: "Invalid credentials!"})
  
    // Generate access token for user.
    const accessToken = jwt.sign({id: user._id},process.env.JWT_SECRET_KEY,{expiresIn:'2h'});
  
    //Return response
    res.status(200).json({
      accessToken,
      user: {
          role: user.role,
          email: user.email
      }
    })
} catch (error) {
  next(error);
}
}