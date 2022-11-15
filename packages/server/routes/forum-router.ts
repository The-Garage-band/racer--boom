import express, {Router} from "express";
import {forumController} from "../controllers";

export const forumRouter: Router = express.Router();

forumRouter.get('/', forumController.readAllThemes);
forumRouter.post('/', forumController.createTheme);
forumRouter.get('/:id', forumController.readTheme);
forumRouter.post('/:id', forumController.createMessage);