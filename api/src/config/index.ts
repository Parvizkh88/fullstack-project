import dotenv from "dotenv";
dotenv.config();

console.log(process.env.SERVER_PORT);

const dev = {
  app: {
    serverPort: process.env.SERVER_PORT || 3001,
    jwtSecretKey: process.env.JWT_SECRET_KEY || "hheetyssgdu!h",
  },
  db: {
    url: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ecommerce2023",
  },
};

export default dev;
