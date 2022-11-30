import type {Request, Response} from 'express';
import {literal} from 'sequelize';
import {ForumMessage, ForumTheme} from '../models';

class ForumController {
  public createTheme = async (request: Request, response: Response) => {
    console.log(request.body);
    const name: string = request.body.name;
    const creationUser: number = request.body.creationUser;

    const theme = await ForumTheme.build();
    theme.name = name;
    theme.creationUser = creationUser;
    await theme.save();

    response.send(theme);
  };

  public deleteTheme = async (request: Request, response: Response) => {
    const id = request.params.id;
    const theme = await ForumTheme.findOne({where: {id}});
    if (theme) {
      await ForumTheme.destroy({where: {id}});
      await ForumMessage.destroy({where: {theme_id: id}});
      response.send();
    }

    response.status(404).send();
  };

  public editTheme = async (request: Request, response: Response) => {
    const id = request.params.id;
    const name: string = request.body.name;

    const theme = await ForumTheme.update({name}, {where: {id}});
    response.send(theme);
  };

  public readTheme = async (request: Request, response: Response) => {
    const id = request.params.id;

    const theme = await ForumTheme.findOne({where: {id}});
    if (theme) {
      const messages = await theme.getMessages();
      messages.sort((a: ForumMessage, b: ForumMessage) => {
        const bForumMessage: ForumMessage = b.dataValues;
        const bForumMessageId = bForumMessage.id;
        const aForumMessage: ForumMessage = a.dataValues;
        const aForumMessageId = aForumMessage.id;
        return parseFloat(`${aForumMessageId}`) -
            parseFloat(`${bForumMessageId}`);
      });

      response.send({
        id: theme.id,
        name: theme.name,
        messages,
      });
    }

    response.status(404).send();
  };

  public readAllThemes = async (_request: Request, response: Response) => {
    const themes = await ForumTheme.findAll({
      attributes: [
        'id', 'name', 'creationUser', 'creationDate',
        [
          literal(
              '(SELECT count(*) from "forum_message" where "forum_message"."theme_id" = "ForumTheme"."id")'),
          'countAnswer'],
      ],
      group: ['id', 'name', 'creationUser', 'creationDate'],
    });

    response.send(themes);
  };

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
  };

  public deleteMessage = async (request: Request, response: Response) => {
    const id = request.params.id;
    const theme = await ForumMessage.findOne({where: {id}});
    if (theme) {
      await ForumMessage.destroy({where: {id}});
      response.send();
    }

    response.status(404).send();
  };

  public editMessage = async (request: Request, response: Response) => {
    const id = request.params.id;
    const text: string = request.body.text;

    const theme = await ForumMessage.update({text}, {where: {id}});
    response.send(theme);
  };

}

export const forumController = new ForumController();