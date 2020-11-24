import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Task from '../models/Task';
import ProjectList from '../models/ProjectList';

export default class TaskController {
  /**
   * Find task by id
   * @param req
   * @param res
   */
  static async findTaskById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const projectRepository = getRepository(Task);
    try {
      const task = await projectRepository.findOne({
        where: {
          id: id,
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
   */
  static async saveTask(req: Request, res: Response): Promise<Response> {
    const { projectListId } = req.params;

    const taskRepository = getRepository(Task);
    const projectListRepository = getRepository(ProjectList);
    const {
      id = null,
      title = '',
      description = '',
      deadlineDate = new Date(),
      attachments = [],
      comments = [],
      labels = [],
    } = req.body;
    let task = new Task(title, description);
    task.id = id;
    task.labels = labels;
    task.attachments = attachments;
    task.comments = comments;
    task.deadlineDate = deadlineDate;

    try {
      task.projectList = await projectListRepository.findOne({
        where: {
          id: projectListId,
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
   */
  static async updateTaskByProjectId(req: Request, res: Response): Promise<Response> {
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
   */
  static async deleteTaskById(req: Request, res: Response): Promise<Response> {
    const { taskId } = req.params;

    const taskRepository = getRepository(Task);
    try {
      await taskRepository.delete(taskId);
      return res.status(204).json('ok');
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}
