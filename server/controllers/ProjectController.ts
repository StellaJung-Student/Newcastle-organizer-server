import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Project from '../models/Project';
import User from '../models/User';

interface RequestUser {
  data: User;
}

export default class ProjectController {
  /**
   * Get all the projects
   * @param req
   * @param res
   * @param next
   */
  static async findAllProjects(req: Request, res: Response, next: NextFunction) {
    const projectRepository = getRepository(Project);
    try {
      const projects = await projectRepository.find({
        where: {
          publicStatus: true,
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
   * Find project by id
   * @param req
   * @param res
   * @param next
   */
  static async findProjectById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const projectRepository = getRepository(Project);
    try {
      const project = await projectRepository.findOne({
        where: {
          id: id,
          publicStatus: null,
        },
      });
      if (project) {
        return res.status(200).json(project);
      }
      return res.status(404).json({
        message: `There is no project with id: ${id}`,
      });
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  static async saveProject(req: Request, res: Response, next: NextFunction) {
    const projectRepository = getRepository(Project);
    const { title = '', description = '', imageUrl = '', publicStatus = true, tags = [] } = req.body;
    const user = req.user as User;
    let project = new Project(title, description, imageUrl, publicStatus, tags);
    project.owner = user;
    project.members = [user];
    try {
      project = await projectRepository.save(project);
      //await userRepository.save(user);
      return res.status(201).send({
        id: project.id,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}
