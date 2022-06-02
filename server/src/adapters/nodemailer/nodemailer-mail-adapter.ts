import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import { MailAdapter, SendMailData } from "../mail-adapter";

dotenv.config();

const transport = nodemailer.createTransport({
  host: process.env.HOST_MAIL,
  port: 2525,
  auth: {
    user: process.env.HOST_USER,
    pass: process.env.HOST_PASSWORD,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Marlinsk <Marlonnlmx@outlook.com>",
      subject,
      html: body,
    });
  }
}
