import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Project from '../models/Project';
import Task from '../models/Task';

export default class TaskController {
  /**
   * Get all the projects
   * @param req
   * @param res
   * @param next
   */
  static async findTaskByProjectId(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;

    const projectRepository = getRepository(Task);
    try {
      const projects = await projectRepository.find({
        where: {
          projectId: projectId,
        },
      });
      if (projects.length === 0) {
        return res.status(200).json([]);
      }
      return res.status(200).json(projects);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  /**
   * Find task by id
   * @param req
   * @param res
   * @param next
   */
  static async findTaskByIdAndProjectId(req: Request, res: Response, next: NextFunction) {
    const { id, projectId } = req.params;

    const projectRepository = getRepository(Task);
    try {
      const task = await projectRepository.findOne({
        where: {
          id: id,
          projectId: projectId,
        },
      });
      if (task) {
        return res.status(200).json(task);
      }
      return res.status(404).json({
        message: `There is no task with id: ${id}`,
      });
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  /**
   * Save task to project according to project id
   * @param req
   * @param res
   * @param next
   */
  static async saveTask(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;

    const taskRepository = getRepository(Task);
    const projectRepository = getRepository(Project);
    const { title = '', description = '' } = req.body;
    let task = new Task(title, description);

    try {
      task.project = await projectRepository.findOne({
        where: {
          id: projectId,
        },
      });
      task = await taskRepository.save(task);
      return res.status(201).send({
        id: task.id,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  /**
   * Update task to project according to project id
   * @param req
   * @param res
   * @param next
   */
  static async updateTaskByProjectId(req: Request, res: Response, next: NextFunction) {
    const taskRepository = getRepository(Task);
    const { id, title = '', description = '' } = req.body;
    const task = new Task(title, description);
    try {
      await taskRepository.update(id, task);
      return res.status(200).json(task);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  /**
   * Delete task to project according to project id
   * @param req
   * @param res
   * @param next
   */
  static async deleteTaskById(req: Request, res: Response, next: NextFunction) {
    const { taskId } = req.params;

    const taskRepository = getRepository(Task);
    try {
      await taskRepository.delete(taskId);
      return res.status(204);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}
