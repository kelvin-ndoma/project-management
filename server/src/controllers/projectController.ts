import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all projects
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving projects: ${error.message}` });
  }
};

// Create a new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: { name, description, startDate, endDate },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating a project: ${error.message}` });
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, startDate, endDate } = req.body;

  try {
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: { name, description, startDate, endDate },
    });
    res.json(updatedProject);
  } catch (error: any) {
    res.status(500).json({ message: `Error updating project: ${error.message}` });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.project.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // 204 No Content
  } catch (error: any) {
    res.status(500).json({ message: `Error deleting project: ${error.message}` });
  }
};
