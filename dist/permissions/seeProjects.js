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
exports.seeProjectWithPermission = exports.seeProjectWithNoPermissions = void 0;
const typeorm_1 = require('typeorm');
const Project_1 = __importDefault(require('../models/Project'));
exports.seeProjectWithNoPermissions = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = typeorm_1.getRepository(Project_1.default);
    return yield projectRepository.find({
      where: {
        publicStatus: true,
      },
    });
  });
exports.seeProjectWithPermission = (user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const projectRepository = typeorm_1.getRepository(Project_1.default);
    return yield projectRepository.find({
      where: {
        id: user.id,
      },
    });
  });
//# sourceMappingURL=seeProjects.js.map
