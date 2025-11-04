"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.get("/", taskController_1.getTasks); // Get tasks by projectId
router.post("/", taskController_1.createTask); // Create a task
router.patch("/:taskId/status", taskController_1.updateTaskStatus); // Update task status
router.get("/user/:userId", taskController_1.getUserTasks); // Get tasks for a user
router.delete("/:taskId", taskController_1.deleteTask); // Delete a task
exports.default = router;
