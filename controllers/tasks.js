import { TaskModel } from "../models/task.js";
import { markTaskCompleted, taskValidator } from "../validators/tasks.js";

export const createTask = async(req,res,next) => {
    try {
        const {value,error} = taskValidator.validate(req.body);
    
        if(error) return res.status(422).json(error);
    
        // Save product information to the database.
        const task = await TaskModel.create({
            ...value,
            userId: req.auth.id
        })

        return res.status(201).json(task);
    } catch (error) {
        next(error);
    }
}

export const getTasks = async(req,res,next) => {
    try {
        // Fetch products from database.
        const tasks = await TaskModel.find({userId: req.auth.id});

        // Return response
        res.status(200).json(tasks);
        
    } catch (error) {
        next(error);
    }
}

export const editTask = async(req,res,next) => {
    try {
        //Fetch product from database.
        const taskId = req.params.id;

        const updatedTask = await TaskModel.findByIdAndUpdate(
          taskId,
          { $set: req.body }, // 👈 Set only the validated fields
          { new: true, runValidators: true }
        );

        if (!updatedTask) {
          return next({status: 404, message: "Task not found"});
        }

        return res.status(200).json(updatedTask);

        
    } catch (error) {
        next(error);
    }
}

export const markCompleted = async(req,res,next) => {
    try {
        const taskId = req.params.id;

        const {error, value} = markTaskCompleted.validate(req.body);

        if(error){
            return res.status(400).json({
              message: "Validation failed",
              errors: error.details.map((d) => d.message),
            });
        }
    
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId,value,{new:true});

        if(!updatedTask) return next({status: 404, message: "Task not found"});
    
        return res
          .status(200)
          .json({ message: "Task completed successfully"});
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async(req,res,next) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        if(!deletedTask) return next({ status: 404, message: "Task not found" });

        return res.status(200).json({message: "Task deleted successfully."});


    } catch (error) {
        next(error);
    }
}