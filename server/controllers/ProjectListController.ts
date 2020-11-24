import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import ProjectList from '../models/ProjectList';
import Project from '../models/Project';

/**
 * Project list controller
 */
export default class ProjectListController {
  /**
   * Get all the projectLists
   * @param req
   * @param res
   */
  static async findAllProjectsListByProjectId(req: Request, res: Response): Promise<Response> {
    const { projectId } = req.params;
    const projectListRepository = getRepository(ProjectList);
    const projectRepository = getRepository(Project);
    try {
      const project = await projectRepository.findOne({
        where: {
          id: projectId,
        },
      });

      const projectLists = await projectListRepository.find({
        relations: ['tasks', 'tasks.comments'],
        order: {
          id: 'ASC',
        },
        where: {
          project: project,
        },
      });
      if (projectLists.length === 0) {
        return res.status(200).json([]);
      }
      return res.status(200).json(projectLists);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  /**
   * Find projectList by id
   * @param req
   * @param res
   */
  static async findProjectListByIdByProjectId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const projectListRepository = getRepository(ProjectList);
    try {
      const projectList = await projectListRepository.findOne({
        where: {
          id: id,
        },
      });
      if (projectList) {
        return res.status(200).json(projectList);
      }
      return res.status(404).json({
        message: `There is no projectList with id: ${id}`,
      });
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  /**
   * Save project list
   * @param req
   * @param res
   */
  static async saveProjectList(req: Request, res: Response): Promise<Response> {
    const { projectId } = req.params;
    const projectRepository = getRepository(Project);
    const projectListRepository = getRepository(ProjectList);
    const { title = '' } = req.body;
    let projectList = new ProjectList();
    projectList.title = title;
    try {
      projectList.project = await projectRepository.findOne({
        where: {
          id: projectId,
        },
      });
      projectList.tasks = [];
      projectList = await projectListRepository.save(projectList);
      return res.status(201).send({
        id: projectList.id,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  /**
   * Save project list
   * @param req
   * @param res
   */
  static async updateProjectList(req: Request, res: Response): Promise<Response> {
    const projectListRepository = getRepository(ProjectList);
    const { id, title = '', tasks = [] } = req.body;
    const projectList = new ProjectList();
    projectList.title = title;
    projectList.tasks = tasks;
    projectList.id = id;
    try {
      await projectListRepository.save(projectList);
      return res.status(200).json(projectList);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  /**
   * Delete project list project list id
   * @param req
   * @param res
   */
  static async deleteProjectListById(req: Request, res: Response): Promise<Response> {
    const { projectListId } = req.params;
    const projectListRepository = getRepository(ProjectList);
    try {
      await projectListRepository.delete(projectListId);
      return res.status(204).json('ok');
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}
