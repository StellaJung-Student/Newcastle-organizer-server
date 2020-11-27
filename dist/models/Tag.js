'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const typeorm_1 = require('typeorm');
const Project_1 = __importDefault(require('./Project'));
let Tag = class Tag {
  constructor(title, color) {
    this.title = title;
    this.color = color;
  }
};
__decorate([typeorm_1.PrimaryGeneratedColumn(), __metadata('design:type', Number)], Tag.prototype, 'id', void 0);
__decorate([typeorm_1.Column(), __metadata('design:type', String)], Tag.prototype, 'title', void 0);
__decorate([typeorm_1.Column(), __metadata('design:type', String)], Tag.prototype, 'color', void 0);
__decorate(
  [
    typeorm_1.ManyToOne(
      () => Project_1.default,
      (project) => project.tags
    ),
    __metadata('design:type', Project_1.default),
  ],
  Tag.prototype,
  'project',
  void 0
);
Tag = __decorate([typeorm_1.Entity(), __metadata('design:paramtypes', [String, String])], Tag);
exports.default = Tag;
//# sourceMappingURL=Tag.js.map
