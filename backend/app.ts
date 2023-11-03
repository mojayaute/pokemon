// @/app.ts
import "reflect-metadata";
import express from "express";
import connection from "./config/connection";
import routes from "./routes";

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(routes);

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(8000, () => {
      console.log("Server started on port 8000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();