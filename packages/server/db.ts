import type {SequelizeOptions} from "sequelize-typescript";
import {Sequelize} from "sequelize-typescript";
import {ForumMessage, ForumTheme} from "./models";

// @ts-ignore
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env.NODE_ENV

export const createClientAndConnect = async () => {
  console.log(POSTGRES_USER,POSTGRES_PASSWORD,POSTGRES_DB,POSTGRES_PORT);
  console.log(process.env)
  const sequelizeOptions: SequelizeOptions = {
    host: '158.160.15.125',
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    dialect: 'postgres',
  };

  const sequelize = new Sequelize(sequelizeOptions);
  //sequelize.sync({ force: true })
  sequelize.addModels([ForumTheme, ForumMessage]);

  await sequelize.sync();
}
