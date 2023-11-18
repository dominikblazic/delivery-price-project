import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('email.username'),
        pass: this.configService.get<string>('email.password'),
        method: 'LOGIN',
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('email.username'),
        to,
        subject,
        text,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}