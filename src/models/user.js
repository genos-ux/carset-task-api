import {Schema, model} from "mongoose"

const userSchema = Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);