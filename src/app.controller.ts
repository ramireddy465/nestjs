import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import {Request, Response} from 'express';
import { AppService } from './app.service';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import * as nodemailer from 'nodemailer';


@Controller('/sign')
export class AppController {
  accessToken:string
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  sign(@Req() req:Request, @Res() res:Response) {

    console.log(req.body.input.email)
  //  console.log(req.body.input.password)
    console.log("llllllllllllllllll")
   
   // this.accessToken = "dfgbkdjbgkdxjcbkdjfb"

   if(req.body.input.email && req.body.input.password !== null){

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(req.body.input.password, salt);
    console.log(hashPassword)

    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'ramireddy465@gmail.com', // sender address
        to: req.body.input.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(console.error);



    var token = jwt.sign({ foo: req.body.input.email }, 'shhhhh');

    console.log(token)
 
   return  res.json({
     token:token,
    password:hashPassword,
  sendEmail:true})
   }
   

   // return req.body.input.name

  }

}
