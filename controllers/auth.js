import { UserModel } from "../models/user.js";
import { loginUserValidator, registerUserValidator } from "../validators/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async(req,res,next) => {
  const { error, value } = registerUserValidator.validate(req.body);

  if (error) {
    return res.status(422).json(error);
  }

  // Check if user does not exist already
  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });

  if (user)
    return res
      .status(409)
      .json("Email already in use. Please log in or use a different email.");

  const passwordHash = bcrypt.hashSync(value.password, 10);

  await UserModel.create({
    ...value,
    password: passwordHash,
  });

  // Return Response
  return res.status(201).json("Registration successful! Welcome aboard.");
}

export const loginUser = async(req,res) => {
// Validate user information
  const { error, value } = loginUserValidator.validate(req.body);

  if (error) return res.status(422).json(error);

  // Find matching user record in database
  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });

  if (!user) {
    return res.status(404).json("User does not exist!");
  }

  // Compare incoming password with saved password
  const comparePassword = bcrypt.compareSync(value.password, user.password);

  if(!comparePassword) return res.status(401).json("Invalid credentials!");

  // Generate access token for user.
  const accessToken = jwt.sign({userId: user.id},process.env.JWT_SECRET_KEY,{expiresIn:'2h'});

  //Return response
  res.status(200).json({
    accessToken,
    user: {
        role: user.role,
        email: user.email
    }
  })
}

