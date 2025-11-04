import { Router } from "express";
import {
  createTask,
  getTasks,
  getUserTasks,
  updateTaskStatus,
  deleteTask, // import the delete function
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);                 // Get tasks by projectId
router.post("/", createTask);              // Create a task
router.patch("/:taskId/status", updateTaskStatus); // Update task status
router.get("/user/:userId", getUserTasks); // Get tasks for a user
router.delete("/:taskId", deleteTask);     // Delete a task

export default router;
