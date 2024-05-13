import dotenv from "dotenv";

dotenv.config();

const varenv = {
  mongo_url: process.env.MONGO_BD_URL,
  cookies_secret: process.env.COOKIES_SECRET,
  session_secret: process.env.SESSION_SECRET,
  jwt_secret: process.env.JWT_SECRET,
  salt: process.env.SALT,
};

export default varenv;
