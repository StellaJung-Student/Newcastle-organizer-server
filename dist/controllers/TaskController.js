'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const typeorm_1 = require('typeorm');
const Task_1 = __importDefault(require('../models/Task'));
const ProjectList_1 = __importDefault(require('../models/ProjectList'));
class TaskController {
  /**
   * Find task by id
   * @param req
   * @param res
   */
  static findTaskById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { id } = req.params;
      const projectRepository = typeorm_1.getRepository(Task_1.default);
      try {
        const task = yield projectRepository.findOne({
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
    });
  }
  /**
   * Save task to project according to project id
   * @param req
   * @param res
   */
  static saveTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { projectListId } = req.params;
      const taskRepository = typeorm_1.getRepository(Task_1.default);
      const projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
      const {
        id = null,
        title = '',
        description = '',
        deadlineDate = new Date(),
        attachments = [],
        comments = [],
        labels = [],
      } = req.body;
      let task = new Task_1.default(title, description);
      task.id = id;
      task.labels = labels;
      task.attachments = attachments;
      task.comments = comments;
      task.deadlineDate = deadlineDate;
      try {
        task.projectList = yield projectListRepository.findOne({
          where: {
            id: projectListId,
          },
        });
        task = yield taskRepository.save(task);
        return res.status(201).send({
          id: task.id,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    });
  }
  /**
   * Update task to project according to project id
   * @param req
   * @param res
   */
  static updateTaskByProjectId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const taskRepository = typeorm_1.getRepository(Task_1.default);
      const { id, title = '', description = '' } = req.body;
      const task = new Task_1.default(title, description);
      try {
        yield taskRepository.update(id, task);
        return res.status(200).json(task);
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    });
  }
  /**
   * Delete task to project according to project id
   * @param req
   * @param res
   */
  static deleteTaskById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
      const { taskId } = req.params;
      const taskRepository = typeorm_1.getRepository(Task_1.default);
      try {
        yield taskRepository.delete(taskId);
        return res.status(204).json('ok');
      } catch (e) {
        console.log(e);
        return res.status(500).json(e);
      }
    });
  }
}
exports.default = TaskController;
//# sourceMappingURL=TaskController.js.map
