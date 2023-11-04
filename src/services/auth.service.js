const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const UserService = require("./user.service.js");

const { config } = require("../config/config");
const { models } = require("../libs/sequelize");

const service = new UserService();
class AuthService {
  constructor() {}

  async findUser(email, password) {
    const user = await models.User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw boom.notFound("wrong user or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.notFound("wrong user or password");
    }
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    

    return user;
  }

  signToken(user) {
  
    //do the payload
    const payload = {
      sub: user.id,
      role: user.role,
    };

    //do token, only send rol and user´s id
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });

    //delete data from before answer
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;
    
    

    //return user and token
    return { user, token };
  }

  async sendRecoveryPassword(email) {
    
    const user = await service.findByEmail(email)

    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    const link = `${config.frontendRecoveryView}${token}`;
    
    //updating recoveryToken on DB
    await service.update(user.id,{recoveryToken:token});
    const mail = {
      from: config.mailAdress, // sender address
      to: `${user.email}`, // list of receivers
      subject: `Recovery password email`, // Subject line
      html: `<h1>Hello ${user.nickname}</h1><br/><p>if you are trying to recover your password please follow the link bellow</p><br/><b>${link}</b>`, // html body
    };

    const rta = await this.sendEmail(mail);
    return rta;
  }

  async sendEmail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.sttpServer,
      secure: true,
      port: 465,
      auth: {
        user: config.mailAdress,
        pass: config.mailPassword,
      },
    });

    await transporter.sendMail(infoMail);

    return { message: "mail sent successfully" };
  }

  async changePassword(token, newPassword){
      try {
        const payload = jwt.verify(token, config.jwtSecret);
        const user = await service.findOne(payload.sub);

        if(user.recoveryToken !== token){
          throw boom.unauthorized();
        }

        //delete recoveryPassword to avoid re-using it
        await service.update(user.id,{
          recoveryToken:null,
          password:newPassword
          
        });

        return {message: 'password changed successfully 😉'};

      } catch (error) {
        throw boom.unauthorized();
      }
  }
}



module.exports = AuthService;
