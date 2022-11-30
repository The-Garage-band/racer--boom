import express, {Router} from "express";
import {forumController} from "../controllers";

export const forumRouter: Router = express.Router();

forumRouter.get('/', forumController.readAllThemes);
forumRouter.post('/', forumController.createTheme);
forumRouter.get('/:id', forumController.readTheme);
forumRouter.delete('/:id', forumController.deleteTheme);
forumRouter.put('/:id', forumController.editTheme);
forumRouter.post('/:id', forumController.createMessage);