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
var Tag_1 = __importDefault(require('../models/Tag'));
var TagController = /** @class */ (function () {
  function TagController() {}
  /**
   * Get all the projects
   * @param req
   * @param res
   * @param next
   */
  TagController.findTagByProjectId = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
      var projectId, projectRepository, projects, e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            projectId = req.params.projectId;
            projectRepository = typeorm_1.getRepository(Tag_1.default);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              projectRepository.find({
                where: {
                  projectId: projectId,
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
   * Find tag by id
   * @param req
   * @param res
   * @param next
   */
  TagController.findTagByIdAndProjectId = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
      var _a, id, projectId, projectRepository, tag, e_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            (_a = req.params), (id = _a.id), (projectId = _a.projectId);
            projectRepository = typeorm_1.getRepository(Tag_1.default);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              projectRepository.findOne({
                where: {
                  id: id,
                  projectId: projectId,
                },
              }),
            ];
          case 2:
            tag = _b.sent();
            if (tag) {
              return [2 /*return*/, res.status(200).json(tag)];
            }
            return [
              2 /*return*/,
              res.status(404).json({
                message: 'There is no tag with id: ' + id,
              }),
            ];
          case 3:
            e_2 = _b.sent();
            return [2 /*return*/, res.status(500).json(e_2)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Save tag to project according to project id
   * @param req
   * @param res
   * @param next
   */
  TagController.saveTag = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
      var projectId, tagRepository, projectRepository, _a, _b, title, _c, color, tag, _d, e_3;
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            projectId = req.params.projectId;
            tagRepository = typeorm_1.getRepository(Tag_1.default);
            projectRepository = typeorm_1.getRepository(Project_1.default);
            (_a = req.body),
              (_b = _a.title),
              (title = _b === void 0 ? '' : _b),
              (_c = _a.color),
              (color = _c === void 0 ? 'red' : _c);
            tag = new Tag_1.default(title, color);
            _e.label = 1;
          case 1:
            _e.trys.push([1, 4, , 5]);
            _d = tag;
            return [
              4 /*yield*/,
              projectRepository.findOne({
                where: {
                  id: projectId,
                },
              }),
            ];
          case 2:
            _d.project = _e.sent();
            return [4 /*yield*/, tagRepository.save(tag)];
          case 3:
            tag = _e.sent();
            return [
              2 /*return*/,
              res.status(201).send({
                id: tag.id,
              }),
            ];
          case 4:
            e_3 = _e.sent();
            console.log(e_3);
            return [2 /*return*/, res.status(500).json(e_3)];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Update tag to project according to project id
   * @param req
   * @param res
   * @param next
   */
  TagController.updateTagByProjectId = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
      var tagRepository, _a, id, _b, title, _c, color, tag, e_4;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            tagRepository = typeorm_1.getRepository(Tag_1.default);
            (_a = req.body),
              (id = _a.id),
              (_b = _a.title),
              (title = _b === void 0 ? '' : _b),
              (_c = _a.color),
              (color = _c === void 0 ? '' : _c);
            tag = new Tag_1.default(title, color);
            _d.label = 1;
          case 1:
            _d.trys.push([1, 3, , 4]);
            return [4 /*yield*/, tagRepository.update(id, tag)];
          case 2:
            _d.sent();
            return [2 /*return*/, res.status(200).json(tag)];
          case 3:
            e_4 = _d.sent();
            console.log(e_4);
            return [2 /*return*/, res.status(500).json(e_4)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Delete tag to project according to project id
   * @param req
   * @param res
   * @param next
   */
  TagController.deleteTagById = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
      var tagId, tagRepository, e_5;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            tagId = req.params.tagId;
            tagRepository = typeorm_1.getRepository(Tag_1.default);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, tagRepository.delete(tagId)];
          case 2:
            _a.sent();
            return [2 /*return*/, res.status(204)];
          case 3:
            e_5 = _a.sent();
            console.log(e_5);
            return [2 /*return*/, res.status(500).json(e_5)];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return TagController;
})();
exports.default = TagController;
//# sourceMappingURL=TagController.js.map
