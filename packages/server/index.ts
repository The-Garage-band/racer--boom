import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'
import {forumRouter} from "./routes";

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = Number(process.env.SERVER_PORT) || 3001
app.use('/forum', forumRouter);

Promise.resolve()
  .then(() => createClientAndConnect())
  .then(() => app.listen(port, () => console.log(`  ➜ 🎸 Server is listening on port: ${port}`)));