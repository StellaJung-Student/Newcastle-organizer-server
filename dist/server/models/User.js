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
var Users = /** @class */ (function () {
  function Users(
    email,
    password,
    firstname,
    lastname,
    username,
    googleId,
    facebookId
    // isEnabled: Boolean,
    // isAccountExpired: Boolean,
    // isBanned: Boolean
  ) {
    this.email = email;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.googleId = googleId;
    this.facebookId = facebookId;
    // this.isEnabled = isEnabled;
    // this.isAccountExpired = isAccountExpired;
    // this.isBanned = isBanned;
  }
  __decorate([typeorm_1.PrimaryGeneratedColumn(), __metadata('design:type', String)], Users.prototype, 'id', void 0);
  __decorate([typeorm_1.Column({ unique: true }), __metadata('design:type', String)], Users.prototype, 'email', void 0);
  __decorate([typeorm_1.Column(), __metadata('design:type', String)], Users.prototype, 'password', void 0);
  __decorate([typeorm_1.Column(), __metadata('design:type', String)], Users.prototype, 'firstname', void 0);
  __decorate([typeorm_1.Column(), __metadata('design:type', String)], Users.prototype, 'lastname', void 0);
  __decorate([typeorm_1.Column(), __metadata('design:type', String)], Users.prototype, 'username', void 0);
  __decorate(
    [typeorm_1.Column({ nullable: true }), __metadata('design:type', String)],
    Users.prototype,
    'googleId',
    void 0
  );
  __decorate(
    [typeorm_1.Column({ nullable: true }), __metadata('design:type', String)],
    Users.prototype,
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
    Users.prototype,
    'projects',
    void 0
  );
  __decorate(
    [typeorm_1.Column({ default: false }), __metadata('design:type', Boolean)],
    Users.prototype,
    'isEnabled',
    void 0
  );
  __decorate(
    [typeorm_1.Column({ default: false }), __metadata('design:type', Boolean)],
    Users.prototype,
    'isAccountExpired',
    void 0
  );
  __decorate(
    [typeorm_1.Column({ default: false }), __metadata('design:type', Boolean)],
    Users.prototype,
    'isBanned',
    void 0
  );
  Users = __decorate(
    [typeorm_1.Entity(), __metadata('design:paramtypes', [String, String, String, String, String, String, String])],
    Users
  );
  return Users;
})();
exports.default = Users;
//# sourceMappingURL=User.js.map
