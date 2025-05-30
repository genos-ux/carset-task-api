import { UserModel } from "../models/user.js";
import { registerUserValidator } from "../validators/users.js"
import bcrypt from "bcrypt"

export const registerUser = async(req,res,next) => {
  const { error, value } = registerUserValidator.validate(req.body);

  if (error) {
    return res.status(422).json(error);
  }

  const user = await UserModel.findOne({ email: value.email });

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