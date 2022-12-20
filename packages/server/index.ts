import dotenv from 'dotenv'
import type {Request, Response} from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import { createServer } from 'vite'
dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'
import {forumRouter} from "./routes";
import {ssrController} from "./ssr";
import * as path from "path";

createServer({
  server: { middlewareMode: true },
  appType: 'custom'
}).then((vite) => {
  const app = express()
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use('/forum', forumRouter);

  const ssr = (req: Request, res: Response) => ssrController(vite, req, res);

  const clientRoutes = [
    '/',
    '/forum',
    '/log_in',
    '/sign_up',
    '/logout',
    '/profile',
    '/game',
    '/home',
    '/leaderboard',
    '/end-game',
  ];
  clientRoutes.forEach(route => app.get(route, ssr));

  app.use(vite.middlewares);

  app.use('/assets', express.static(path.join(__dirname, '../../client/dist/assets')));
  app.use('/', express.static(path.join(__dirname, '../../client/dist')));

  return app;
})
  .then((app) => createClientAndConnect().then(() => app))
  .then((app) => {
    const port = Number(process.env.SERVER_PORT) || 3001;
    app.listen(port, () => console.log(`  ➜ 🎸 Server is listening on port: ${port}`))
  });