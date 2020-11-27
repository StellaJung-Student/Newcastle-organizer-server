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
const User_1 = __importDefault(require('../models/User'));
const bcrypt_1 = require('../helpers/bcrypt');
const jwt_1 = require('../helpers/jwt');
class AuthController {}
exports.default = AuthController;
/**
 * User sign up
 * @param req
 * @param res
 */
AuthController.signUp = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    //Get name, email, password
    const { firstname = '', lastname = '', username = '', email, password } = req.body;
    //Verify if user enter
    if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
      return res.status(500).json({ success: false, data: 'Enter a valid email address.' });
    } else if (password.length < 5 || password.length > 20) {
      return res.status(500).json({
        success: false,
        data: 'Password must be between 5 and 20 characters.',
      });
    }
    //Insert the user
    const userRepository = typeorm_1.getRepository(User_1.default);
    try {
      //Hash password before inserting to database
      const hashedPassword = yield bcrypt_1.hashPassword(password);
      yield userRepository.save(new User_1.default(email, hashedPassword, firstname, lastname, username, null, null));
      res.status(201).json({
        message: 'Account created',
      });
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  });
/**
 * Log in for the user
 * @param req
 * @param res
 */
AuthController.login = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // usually this would be a database call:
    const user = yield typeorm_1.getRepository(User_1.default).findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'no such user found' });
    }
    try {
      const isPasswordMatched = yield bcrypt_1.comparePassword(password, user.password);
      if (isPasswordMatched) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        //const payload = {id: user.id};
        const token = jwt_1.signToken(user);
        delete user.firstname;
        delete user.lastname;
        delete user.email;
        return res.json({ user, accessToken: token });
      } else {
        return res.status(401).json({ message: 'passwords did not match' });
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  });
//# sourceMappingURL=AuthController.js.map
