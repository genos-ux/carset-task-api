import {Schema, model} from "mongoose"

const userSchema = Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["admin", "manager", "staff"],
      default: "staff",
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", userSchema);