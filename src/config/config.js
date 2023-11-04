require('dotenv').config();

const config = {
	env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
	port: process.env.PORT || 3000,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	dbName: process.env.DB_NAME,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  mailPassword: process.env.MAIL_PASSWORD,
  mailAdress: process.env.MAIL_ADRESS,
  sttpServer: process.env.STTP_SERVER,
  frontendRecoveryView: process.env.FRONTEND_RECOVERY_VIEW
};

module.exports = { config };