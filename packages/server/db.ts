import type {SequelizeOptions} from "sequelize-typescript";
import {Sequelize} from "sequelize-typescript";
import {ForumMessage, ForumTheme} from "./models";

// const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
//   process.env

export const createClientAndConnect = async () => {
  const sequelizeOptions: SequelizeOptions = {
    host: '158.160.15.125',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    dialect: 'postgres',
  };

  const sequelize = new Sequelize(sequelizeOptions);
  //sequelize.sync({ force: true })
  sequelize.addModels([ForumTheme, ForumMessage]);

  await sequelize.sync();
}
