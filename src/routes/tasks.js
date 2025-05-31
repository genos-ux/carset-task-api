import { Router } from "express";
import { createTask, deleteTask, editTask, getTasks, markCompleted } from "../controllers/tasks.js";
import { isAuthenticated } from "../middleware/auth.js";

const taskRoute = Router();

taskRoute.post('/',isAuthenticated,createTask);
taskRoute.get('/',isAuthenticated,getTasks);
taskRoute.put('/:id',isAuthenticated,editTask);
taskRoute.patch('/:id/complete',isAuthenticated,markCompleted);
taskRoute.delete('/:id',isAuthenticated,deleteTask);

export default taskRoute;
