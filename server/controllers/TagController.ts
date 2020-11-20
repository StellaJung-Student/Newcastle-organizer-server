import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Project from '../models/Project';
import Tag from '../models/Tag';

export default class TagController {
  /**
   * Get all the projects
   * @param req
   * @param res
   * @param next
   */
  static async findTagByProjectId(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;

    const projectRepository = getRepository(Tag);
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
   * Find tag by id
   * @param req
   * @param res
   * @param next
   */
  static async findTagByIdAndProjectId(req: Request, res: Response, next: NextFunction) {
    const { id, projectId } = req.params;

    const projectRepository = getRepository(Tag);
    try {
      const tag = await projectRepository.findOne({
        where: {
          id: id,
          projectId: projectId,
        },
      });
      if (tag) {
        return res.status(200).json(tag);
      }
      return res.status(404).json({
        message: `There is no tag with id: ${id}`,
      });
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  /**
   * Save tag to project according to project id
   * @param req
   * @param res
   * @param next
   */
  static async saveTag(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;

    const tagRepository = getRepository(Tag);
    const projectRepository = getRepository(Project);
    const { title = '', color = 'red' } = req.body;
    let tag = new Tag(title, color);

    try {
      tag.project = await projectRepository.findOne({
        where: {
          id: projectId,
        },
      });
      tag = await tagRepository.save(tag);
      return res.status(201).send({
        id: tag.id,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  /**
   * Update tag to project according to project id
   * @param req
   * @param res
   * @param next
   */
  static async updateTagByProjectId(req: Request, res: Response, next: NextFunction) {
    const tagRepository = getRepository(Tag);
    const { id, title = '', color = '' } = req.body;
    let tag = new Tag(title, color);
    try {
      await tagRepository.update(id, tag);
      return res.status(200).json(tag);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  /**
   * Delete tag to project according to project id
   * @param req
   * @param res
   * @param next
   */
  static async deleteTagById(req: Request, res: Response, next: NextFunction) {
    const { tagId } = req.params;

    const tagRepository = getRepository(Tag);
    try {
      await tagRepository.delete(tagId);
      return res.status(204);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}
