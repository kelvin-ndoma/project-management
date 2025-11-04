"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get all projects
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma.project.findMany();
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: `Error retrieving projects: ${error.message}` });
    }
});
exports.getProjects = getProjects;
// Create a new project
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, startDate, endDate } = req.body;
    try {
        const newProject = yield prisma.project.create({
            data: { name, description, startDate, endDate },
        });
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(500).json({ message: `Error creating a project: ${error.message}` });
    }
});
exports.createProject = createProject;
// Update a project
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, startDate, endDate } = req.body;
    try {
        const updatedProject = yield prisma.project.update({
            where: { id: Number(id) },
            data: { name, description, startDate, endDate },
        });
        res.json(updatedProject);
    }
    catch (error) {
        res.status(500).json({ message: `Error updating project: ${error.message}` });
    }
});
exports.updateProject = updateProject;
// Delete a project
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.project.delete({
            where: { id: Number(id) },
        });
        res.status(204).send(); // 204 No Content
    }
    catch (error) {
        res.status(500).json({ message: `Error deleting project: ${error.message}` });
    }
});
exports.deleteProject = deleteProject;
