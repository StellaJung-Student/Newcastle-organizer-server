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
const Comment_1 = __importDefault(require('./Comment'));
const ProjectList_1 = __importDefault(require('./ProjectList'));
let Task = class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
};
__decorate([typeorm_1.PrimaryGeneratedColumn(), __metadata('design:type', Number)], Task.prototype, 'id', void 0);
__decorate([typeorm_1.Column(), __metadata('design:type', String)], Task.prototype, 'title', void 0);
__decorate(
  [typeorm_1.Column({ nullable: true, default: '' }), __metadata('design:type', String)],
  Task.prototype,
  'description',
  void 0
);
__decorate(
  [typeorm_1.Column('character varying', { array: true, nullable: true }), __metadata('design:type', Array)],
  Task.prototype,
  'labels',
  void 0
);
__decorate(
  [typeorm_1.Column('character varying', { array: true, nullable: true }), __metadata('design:type', Array)],
  Task.prototype,
  'attachments',
  void 0
);
__decorate(
  [typeorm_1.Column({ type: 'date', nullable: false }), __metadata('design:type', String)],
  Task.prototype,
  'deadlineDate',
  void 0
);
__decorate(
  [
    typeorm_1.ManyToOne(
      () => ProjectList_1.default,
      (projectList) => projectList.tasks,
      { onDelete: 'CASCADE' }
    ),
    __metadata('design:type', ProjectList_1.default),
  ],
  Task.prototype,
  'projectList',
  void 0
);
__decorate(
  [
    typeorm_1.OneToMany(
      () => Comment_1.default,
      (comment) => comment.task
    ),
    __metadata('design:type', Array),
  ],
  Task.prototype,
  'comments',
  void 0
);
Task = __decorate([typeorm_1.Entity(), __metadata('design:paramtypes', [String, String])], Task);
exports.default = Task;
//# sourceMappingURL=Task.js.map
