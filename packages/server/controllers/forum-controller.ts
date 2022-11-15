import type {Request, Response} from "express";
import {ForumMessage, ForumTheme} from "../models";

class ForumController {
  public createTheme = async (request: Request, response: Response) => {
    console.log(request.body);
    const name: string = request.body.name;

    const theme = await ForumTheme.build();
    theme.name = name;
    await theme.save();

    response.send(theme);
  }

  public readTheme = async (request: Request, response: Response) => {
    const id = request.params.id;

    const theme = await ForumTheme.findOne({where: {id}});
    if (theme) {
      const messages = await theme.getMessages();
      response.send({
        id: theme.id,
        name: theme.name,
        messages,
      });
    }

    response.status(404).send();
  }

  public readAllThemes = async (_request: Request, response: Response) => {
    const themes = await ForumTheme.findAll();

    response.send(themes);
}

  public createMessage = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const userName = request.body.userName;
    const text = request.body.text;

    const theme = await ForumTheme.findOne({where: {id}});

    if (theme) {
      const message = await ForumMessage.build();
      message.theme_id = id;
      message.text = text;
      message.userName = userName;

      await message.save();

      response.send(message);
    }

    response.status(404).send();
  }
}


export const forumController = new ForumController();