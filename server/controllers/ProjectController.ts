import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Project from '../models/Project';
import User from '../models/User';

export default class ProjectController {
  /**
   * Find all projects of user
   * @param req
   * @param res
   */
  static async findAllProjectsOfUser(req: Request, res: Response): Promise<Response> {
    const projectRepository = getRepository(Project);
    console.log(req.user);
    try {
      const projects = await projectRepository.find({
        //Get relation members, owner
        relations: ['owner'],
        where: [
          {
            owner: req.user as User,
          },
        ],
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
   * Get all the projects
   * @param req
   * @param res
   */
  static async findAllProjects(req: Request, res: Response): Promise<Response> {
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
  static async findProjectById(req: Request, res: Response, next: NextFunction): Promise<Response> {
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

  /**
   * Save project
   * @param req request data (json)
   * @param res response (json)
   */
  static async saveProject(req: Request, res: Response): Promise<Response> {
    const projectRepository = getRepository(Project);
    const { title = '', description = '', imageUrl = '', publicStatus = true, tags = [] } = req.body;
    const user = req.user as User;
    let project = new Project(title, description, imageUrl, publicStatus, tags);
    project.owner = user;
    project.members = [user];
    try {
      project = await projectRepository.save(project);
      //await userRepository.save(user);
      console.log(project);
      return res.status(201).send({
        id: project.id,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async updateProject(req: Request, res: Response): Promise<Response> {
    const projectRepository = getRepository(Project);
    const { id, title, description, imageUrl, publicStatus, tags } = req.body;
    let project = new Project(title, description, imageUrl, publicStatus, tags);
    project.id = id;
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

  /**
   * Delete current project if the user has permissions
   * @param req request data
   * @param res response data
   */
  static async deleteProject(req: Request, res: Response): Promise<Response> {
    const projectRepository = getRepository(Project);
    const { id } = req.body;
    try {
      const project = await projectRepository.findOne({
        where: {
          owner: req.user as User,
        },
      });
      if (project) {
        await projectRepository.delete(id);
        return res.status(204).send('ok');
      } else {
        return res.status(403).json({
          message: "You can't do this",
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}
