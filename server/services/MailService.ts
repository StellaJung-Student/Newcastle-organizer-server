import nodemailer from 'nodemailer';
import {
  GMAIL_ACCESS_TOKEN,
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
  GMAIL_USER,
} from '../configs/gmailConfig';

export default class MailService {
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const mailTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: GMAIL_USER,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken: GMAIL_ACCESS_TOKEN,
      },
    });

    const mailDetails = {
      from: 'prayamajhi85@gmail.com',
      to: email,
      subject: 'Verify Account',
      html:
        '<!DOCTYPE html><html lang="en"><body><h1>Verify Account Your Account</h1><p>This is an email to verify that you signed up for newcastle organiser app</p><a href="http://localhost:8080/api/auth/signup/verify/' +
        token +
        '" style="background-color: black; padding:1rem 1.5rem; font-size: 1.5rem; color: #fff">Verify</a></body></html>',
    };

    try {
      await mailTransporter.sendMail(mailDetails);
      console.log('Email sent successfully');
    } catch (e) {
      console.log(e);
    }
  }
}
