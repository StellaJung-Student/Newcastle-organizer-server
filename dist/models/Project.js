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
var typeorm_1 = require('typeorm');
var Tag_1 = __importDefault(require('./Tag'));
var User_1 = __importDefault(require('./User'));
var ProjectList_1 = __importDefault(require('./ProjectList'));
var Project = /** @class */ (function () {
  function Project(title, description, imageUrl, publicStatus, tags) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.publicStatus = publicStatus;
    this.tags = tags;
  }
  __decorate([typeorm_1.PrimaryGeneratedColumn(), __metadata('design:type', Number)], Project.prototype, 'id', void 0);
  __decorate(
    [typeorm_1.Column({ nullable: false }), __metadata('design:type', String)],
    Project.prototype,
    'title',
    void 0
  );
  __decorate(
    [typeorm_1.Column({ nullable: false }), __metadata('design:type', String)],
    Project.prototype,
    'description',
    void 0
  );
  __decorate(
    [typeorm_1.Column({ nullable: true }), __metadata('design:type', String)],
    Project.prototype,
    'imageUrl',
    void 0
  );
  __decorate([typeorm_1.Column(), __metadata('design:type', Boolean)], Project.prototype, 'publicStatus', void 0);
  __decorate(
    [
      typeorm_1.OneToMany(
        function () {
          return Tag_1.default;
        },
        function (tag) {
          return tag.id;
        }
      ),
      __metadata('design:type', Array),
    ],
    Project.prototype,
    'tags',
    void 0
  );
  __decorate(
    [
      typeorm_1.OneToMany(
        function () {
          return ProjectList_1.default;
        },
        function (column) {
          return column.id;
        }
      ),
      __metadata('design:type', Array),
    ],
    Project.prototype,
    'projectLists',
    void 0
  );
  __decorate(
    [
      typeorm_1.ManyToOne(function () {
        return User_1.default;
      }),
      typeorm_1.JoinColumn({ name: 'user_id' }),
      __metadata('design:type', User_1.default),
    ],
    Project.prototype,
    'owner',
    void 0
  );
  __decorate(
    [
      typeorm_1.ManyToMany(function () {
        return User_1.default;
      }),
      typeorm_1.JoinTable({ name: 'project_members' }),
      __metadata('design:type', Array),
    ],
    Project.prototype,
    'members',
    void 0
  );
  __decorate(
    [
      typeorm_1.Column({
        type: 'date',
        default: function () {
          return 'CURRENT_DATE';
        },
      }),
      __metadata('design:type', Date),
    ],
    Project.prototype,
    'createdAt',
    void 0
  );
  __decorate(
    [
      typeorm_1.Column({
        type: 'date',
        default: function () {
          return 'CURRENT_DATE';
        },
      }),
      __metadata('design:type', Date),
    ],
    Project.prototype,
    'updatedAt',
    void 0
  );
  Project = __decorate(
    [typeorm_1.Entity(), __metadata('design:paramtypes', [String, String, String, Boolean, Array])],
    Project
  );
  return Project;
})();
exports.default = Project;
//# sourceMappingURL=Project.js.map
