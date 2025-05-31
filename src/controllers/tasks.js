import { TaskModel } from "../models/task.js";
import { markTaskCompleted, taskValidator } from "../validators/tasks.js";

export const createTask = async(req,res,next) => {
    try {
        //Validate task details from authenticated user.
        const {value,error} = taskValidator.validate(req.body);
    
        if (error) {
          return next({
            message: error.details.map((d) => d.message),
            status: 400,
          });
        }
    
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
        const taskId = req.params.id;

        //Fetch product from database.
        const task = await TaskModel.findOne({userId: req.auth.id, _id: taskId});

        if(!task) return next({status:404, message: 'Task not found.'});

        const updatedTask = await TaskModel.findByIdAndUpdate(
          task._id,
          { $set: req.body }, // 👈 Set only the validated fields
          { new: true, runValidators: true }
        );

        return res.status(200).json(updatedTask);    
    } catch (error) {
        next(error);
    }
}

export const markCompleted = async(req,res,next) => {
    try {
        const { error, value } = markTaskCompleted.validate(req.body);

        if(error) return next({
          message: error.details.map((d) => d.message),
          status: 400,
        });

        const taskId = req.params.id;
        
        //Fetch task of authenticated user.
        const task = await TaskModel.findOne({userId: req.auth.id,_id: taskId});

        if(!task) return next({status:404, message: 'Task not found.'})
    
        await TaskModel.findByIdAndUpdate(task._id,value,{new:true});
    
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

        //Fetch task for the authenticated user.
        const task = await TaskModel.findOne({userId: req.auth.id,_id:taskId});

        if (!task)
            //Error message if the task doesn't belong to authenticated user.
          return next({
            status: 404,
            message: "Task not found.",
          });

        await TaskModel.findByIdAndDelete(task._id);

        return res.status(200).json({message: "Task deleted successfully."});


    } catch (error) {
        next(error);
    }
}