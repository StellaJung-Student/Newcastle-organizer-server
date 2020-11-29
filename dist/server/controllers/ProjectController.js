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
var Project_1 = __importDefault(require('../models/Project'));
var ProjectController = /** @class */ (function () {
  function ProjectController() {}
  /**
   * Find all projects of user
   * @param req
   * @param res
   */
  ProjectController.findAllProjectsOfUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var projectRepository, projects, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            projectRepository = typeorm_1.getRepository(Project_1.default);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              projectRepository.find({
                where: {
                  owner: req.user,
                },
              }),
            ];
          case 2:
            projects = _a.sent();
            if (projects.length === 0) {
              return [2 /*return*/, res.status(200).json([])];
            }
            return [2 /*return*/, res.status(200).json(projects)];
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
   * Get all the projects
   * @param req
   * @param res
   */
  ProjectController.findAllProjects = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var projectRepository, projects, e_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            projectRepository = typeorm_1.getRepository(Project_1.default);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              projectRepository.find({
                where: {
                  publicStatus: true,
                },
              }),
            ];
          case 2:
            projects = _a.sent();
            if (projects.length === 0) {
              return [2 /*return*/, res.status(200).json([])];
            }
            return [2 /*return*/, res.status(200).json(projects)];
          case 3:
            e_2 = _a.sent();
            return [2 /*return*/, res.status(500).json(e_2)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Find project by id
   * @param req
   * @param res
   * @param next
   */
  ProjectController.findProjectById = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
      var id, projectRepository, project, e_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            id = req.params.id;
            projectRepository = typeorm_1.getRepository(Project_1.default);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              projectRepository.findOne({
                where: {
                  id: id,
                  publicStatus: null,
                },
              }),
            ];
          case 2:
            project = _a.sent();
            if (project) {
              return [2 /*return*/, res.status(200).json(project)];
            }
            return [
              2 /*return*/,
              res.status(404).json({
                message: 'There is no project with id: ' + id,
              }),
            ];
          case 3:
            e_3 = _a.sent();
            return [2 /*return*/, res.status(500).json(e_3)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  ProjectController.saveProject = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var projectRepository,
        _a,
        _b,
        title,
        _c,
        description,
        _d,
        imageUrl,
        _e,
        publicStatus,
        _f,
        tags,
        user,
        project,
        e_4;
      return __generator(this, function (_g) {
        switch (_g.label) {
          case 0:
            projectRepository = typeorm_1.getRepository(Project_1.default);
            (_a = req.body),
              (_b = _a.title),
              (title = _b === void 0 ? '' : _b),
              (_c = _a.description),
              (description = _c === void 0 ? '' : _c),
              (_d = _a.imageUrl),
              (imageUrl = _d === void 0 ? '' : _d),
              (_e = _a.publicStatus),
              (publicStatus = _e === void 0 ? true : _e),
              (_f = _a.tags),
              (tags = _f === void 0 ? [] : _f);
            user = req.user;
            project = new Project_1.default(title, description, imageUrl, publicStatus, tags);
            project.owner = user;
            project.members = [user];
            _g.label = 1;
          case 1:
            _g.trys.push([1, 3, , 4]);
            return [4 /*yield*/, projectRepository.save(project)];
          case 2:
            project = _g.sent();
            //await userRepository.save(user);
            return [
              2 /*return*/,
              res.status(201).send({
                id: project.id,
              }),
            ];
          case 3:
            e_4 = _g.sent();
            console.log(e_4);
            return [2 /*return*/, res.status(500).json(e_4)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  ProjectController.updateProject = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var projectRepository, _a, id, title, description, imageUrl, publicStatus, tags, project, e_5;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            projectRepository = typeorm_1.getRepository(Project_1.default);
            (_a = req.body),
              (id = _a.id),
              (title = _a.title),
              (description = _a.description),
              (imageUrl = _a.imageUrl),
              (publicStatus = _a.publicStatus),
              (tags = _a.tags);
            project = new Project_1.default(title, description, imageUrl, publicStatus, tags);
            project.id = id;
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, , 4]);
            return [4 /*yield*/, projectRepository.save(project)];
          case 2:
            project = _b.sent();
            //await userRepository.save(user);
            return [
              2 /*return*/,
              res.status(201).send({
                id: project.id,
              }),
            ];
          case 3:
            e_5 = _b.sent();
            console.log(e_5);
            return [2 /*return*/, res.status(500).json(e_5)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Delete current project if the user has permissions
   * @param req request data
   * @param res response data
   */
  ProjectController.deleteProject = function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
      var projectRepository, id, project, e_6;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            projectRepository = typeorm_1.getRepository(Project_1.default);
            id = req.body.id;
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, , 7]);
            return [
              4 /*yield*/,
              projectRepository.findOne({
                where: {
                  owner: req.user,
                },
              }),
            ];
          case 2:
            project = _a.sent();
            if (!project) return [3 /*break*/, 4];
            return [4 /*yield*/, projectRepository.delete(id)];
          case 3:
            _a.sent();
            return [2 /*return*/, res.status(204).send('ok')];
          case 4:
            return [
              2 /*return*/,
              res.status(403).json({
                message: "You can't do this",
              }),
            ];
          case 5:
            return [3 /*break*/, 7];
          case 6:
            e_6 = _a.sent();
            console.log(e_6);
            return [2 /*return*/, res.status(500).json(e_6)];
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
  return ProjectController;
})();
exports.default = ProjectController;
//# sourceMappingURL=ProjectController.js.map
