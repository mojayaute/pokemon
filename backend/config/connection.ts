// @/connection.ts
import { Sequelize } from "sequelize-typescript";
import { Pokemon } from "../models/models";
import * as config from "./config.json";

const developmentConfig = config.development;
const { host, username, password, database } = developmentConfig;

const connection = new Sequelize({
    dialect: "mysql",
    host: host,
    username: username,
    password: password,
    database: database,
    logging: false,
    models: [Pokemon],
  });

export default connection;