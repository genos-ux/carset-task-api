import { model, Schema, Types } from "mongoose";

const taskSchema = Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "PENDING",
    },
    categories: {
        type:String,
        enum: ["Fleet","Support","Marketing"]
    },
    priorityLevel:{
        type:String,
        enum: ["High","Low","Medium"]
    },
    dueDate: Date,
    userId: { type: Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const TaskModel = model("Task", taskSchema);
