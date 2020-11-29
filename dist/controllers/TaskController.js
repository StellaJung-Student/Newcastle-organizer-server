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
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var typeorm_1 = require('typeorm');
var Task_1 = __importDefault(require('../models/Task'));
var ProjectList_1 = __importDefault(require('../models/ProjectList'));
var TaskController = /** @class */ (function () {
  function TaskController() {}
  /**
   * Find task by id
   * @param req
   * @param res
   */
  TaskController.findTaskById = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var id, projectRepository, task, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            id = req.params.id;
            projectRepository = typeorm_1.getRepository(Task_1.default);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              projectRepository.findOne({
                where: {
                  id: id,
                },
              }),
            ];
          case 2:
            task = _a.sent();
            if (task) {
              return [2 /*return*/, res.status(200).json(task)];
            }
            return [
              2 /*return*/,
              res.status(404).json({
                message: 'There is no task with id: ' + id,
              }),
            ];
          case 3:
            e_1 = _a.sent();
            return [2 /*return*/, res.status(500).json(e_1)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Save task to project according to project id
   * @param req
   * @param res
   */
  TaskController.saveTask = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var projectListId,
        taskRepository,
        projectListRepository,
        _a,
        _b,
        id,
        _c,
        title,
        _d,
        description,
        _e,
        deadlineDate,
        _f,
        attachments,
        _g,
        comments,
        _h,
        labels,
        task,
        _j,
        e_2;
      return __generator(this, function (_k) {
        switch (_k.label) {
          case 0:
            projectListId = req.params.projectListId;
            taskRepository = typeorm_1.getRepository(Task_1.default);
            projectListRepository = typeorm_1.getRepository(ProjectList_1.default);
            (_a = req.body),
              (_b = _a.id),
              (id = _b === void 0 ? null : _b),
              (_c = _a.title),
              (title = _c === void 0 ? '' : _c),
              (_d = _a.description),
              (description = _d === void 0 ? '' : _d),
              (_e = _a.deadlineDate),
              (deadlineDate = _e === void 0 ? new Date() : _e),
              (_f = _a.attachments),
              (attachments = _f === void 0 ? [] : _f),
              (_g = _a.comments),
              (comments = _g === void 0 ? [] : _g),
              (_h = _a.labels),
              (labels = _h === void 0 ? [] : _h);
            task = new Task_1.default(title, description);
            task.id = id;
            task.labels = labels;
            task.attachments = attachments;
            task.comments = comments;
            task.deadlineDate = deadlineDate;
            _k.label = 1;
          case 1:
            _k.trys.push([1, 4, , 5]);
            _j = task;
            return [
              4 /*yield*/,
              projectListRepository.findOne({
                where: {
                  id: projectListId,
                },
              }),
            ];
          case 2:
            _j.projectList = _k.sent();
            return [4 /*yield*/, taskRepository.save(task)];
          case 3:
            task = _k.sent();
            return [
              2 /*return*/,
              res.status(201).send({
                id: task.id,
              }),
            ];
          case 4:
            e_2 = _k.sent();
            console.log(e_2);
            return [2 /*return*/, res.status(500).json(e_2)];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Update task to project according to project id
   * @param req
   * @param res
   */
  TaskController.updateTaskByProjectId = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var taskRepository, _a, id, _b, title, _c, description, task, e_3;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            taskRepository = typeorm_1.getRepository(Task_1.default);
            (_a = req.body),
              (id = _a.id),
              (_b = _a.title),
              (title = _b === void 0 ? '' : _b),
              (_c = _a.description),
              (description = _c === void 0 ? '' : _c);
            task = new Task_1.default(title, description);
            _d.label = 1;
          case 1:
            _d.trys.push([1, 3, , 4]);
            return [4 /*yield*/, taskRepository.update(id, task)];
          case 2:
            _d.sent();
            return [2 /*return*/, res.status(200).json(task)];
          case 3:
            e_3 = _d.sent();
            console.log(e_3);
            return [2 /*return*/, res.status(500).json(e_3)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Delete task to project according to project id
   * @param req
   * @param res
   */
  TaskController.deleteTaskById = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var taskId, taskRepository, e_4;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            taskId = req.params.taskId;
            taskRepository = typeorm_1.getRepository(Task_1.default);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, taskRepository.delete(taskId)];
          case 2:
            _a.sent();
            return [2 /*return*/, res.status(204).json('ok')];
          case 3:
            e_4 = _a.sent();
            console.log(e_4);
            return [2 /*return*/, res.status(500).json(e_4)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return TaskController;
})();
exports.default = TaskController;
//# sourceMappingURL=TaskController.js.map
