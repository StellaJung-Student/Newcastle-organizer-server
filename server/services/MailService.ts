import nodemailer from 'nodemailer';

import { NODEMAILER_EMAIL, NODEMAILER_PASSWORD } from './../configs/baseConfig';

export default class MailService {
  sendVerificationEmail(email: string, token: string): void {
    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: NODEMAILER_EMAIL,
        pass: NODEMAILER_PASSWORD,
      },
    });

    let mailDetails = {
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
  }
}
