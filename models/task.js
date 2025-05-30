import { model, Schema, Types } from "mongoose";

const taskSchema = Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    dueDate: Date,
    assignedTo: { type: Types.ObjectId, ref: "User" },
    userId: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Task", taskSchema);
