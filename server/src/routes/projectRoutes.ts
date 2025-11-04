import express from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController"; // adjust path if needed

const router = express.Router();

// Get all projects
router.get("/", getProjects);

// Create a new project
router.post("/", createProject);

// Update a project by ID
router.put("/:id", updateProject);

// Delete a project by ID
router.delete("/:id", deleteProject);

export default router;
