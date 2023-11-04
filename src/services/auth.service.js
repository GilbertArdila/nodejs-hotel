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

  async findByEmail(email, password) {
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

    return user;
  }

  signToken(user) {
    //do the payload
    const payload = {
      sub: user.id,
      role: user.role,
    };

    //do token, only send rol and user´s id
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "15m" });

    //delete data from before answer
    delete user.dataValues.createdAt;
    delete user.dataValues.updatedAt;

    //return user and token
    return { user, token };
  }

  async sendEmail(email) {
    const user = await models.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: config.sttpServer,
      secure: true,
      port: 465,
      auth: {
        user: config.mailAdress,
        pass: config.mailPassword,
      },
    });

    await transporter.sendMail({
      from: config.mailAdress, // sender address
      to: `${user.email}`, // list of receivers
      subject: `Recovery password email`, // Subject line
      text: `Hello ${user.nickname}`, // plain text body
      html: `<h1>Hello ${user.nickname}</h1><br/><p>if you are trying to recover your password please follow the lonk bellow</p>`, // html body
    });

    return { message: "mail sent" };
  }
}

module.exports = AuthService;
