import { HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

const senMail = async (adres: string, content: string) => {
  try {
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'karzinkawebsite@gmail.com',
        pass: 'jxhpfbsrewpjkcri',
      },
    });

    await transport.sendMail({
      from: 'karzinkawebsite@gmail.com',
      to: adres,
      subject: content,
      text: content,
    });
  } catch (error) {
    console.log(error);
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
};

export default senMail;
