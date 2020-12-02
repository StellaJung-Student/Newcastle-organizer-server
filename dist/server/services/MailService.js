'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var nodemailer_1 = __importDefault(require('nodemailer'));
var MailService = /** @class */ (function () {
  function MailService() {}
  MailService.prototype.sendVerificationEmail = function (email, token) {
    var mailTransporter = nodemailer_1.default.createTransport({
      service: 'gmail',
      auth: {
        user: 'prayamajhi85@gmail.com',
        pass: '9840168144',
      },
    });
    var mailDetails = {
      from: 'prayamajhi85@gmail.com',
      to: email,
      subject: 'Verify Account',
      html:
        '<!DOCTYPE html><html lang="en"><body><h1>Verify Account Your Account</h1><p>This is an email to verify that you signed up for newcastle organiser app</p><a href="http://localhost:8080/api/auth/signup/verify/:' +
        token +
        '" style="background-color: black; padding:1rem 1.5rem; font-size: 1.5rem; color: #fff">Verify</a></body></html>',
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log('Error Occurs');
      } else {
        console.log('Email sent successfully');
      }
    });
  };
  return MailService;
})();
exports.default = MailService;
//# sourceMappingURL=MailService.js.map
