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
var Project_1 = __importDefault(require('./Project'));
var User = /** @class */ (function () {
  function User(email, password, firstname, lastname, username, googleId, facebookId) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.googleId = googleId;
    this.facebookId = facebookId;
  }
  __decorate([typeorm_1.PrimaryGeneratedColumn(), __metadata('design:type', String)], User.prototype, 'id', void 0);
  __decorate([typeorm_1.Column({ unique: true }), __metadata('design:type', String)], User.prototype, 'email', void 0);
  __decorate([typeorm_1.Column(), __metadata('design:type', String)], User.prototype, 'password', void 0);
  __decorate([typeorm_1.Column(), __metadata('design:type', String)], User.prototype, 'firstname', void 0);
  __decorate([typeorm_1.Column(), __metadata('design:type', String)], User.prototype, 'lastname', void 0);
  __decorate([typeorm_1.Column(), __metadata('design:type', String)], User.prototype, 'username', void 0);
  __decorate(
    [typeorm_1.Column({ nullable: true }), __metadata('design:type', String)],
    User.prototype,
    'googleId',
    void 0
  );
  __decorate(
    [typeorm_1.Column({ nullable: true }), __metadata('design:type', String)],
    User.prototype,
    'facebookId',
    void 0
  );
  __decorate(
    [
      typeorm_1.OneToMany(
        function (type) {
          return Project_1.default;
        },
        function (project) {
          return project.owner;
        }
      ),
      __metadata('design:type', Array),
    ],
    User.prototype,
    'projects',
    void 0
  );
  User = __decorate(
    [typeorm_1.Entity(), __metadata('design:paramtypes', [String, String, String, String, String, String, String])],
    User
  );
  return User;
})();
exports.default = User;
//# sourceMappingURL=User.js.map
