import axios from "axios";

export type ForumMessage = {
  id: number,
  theme_id: number,
  text: string,
  userName: string,
  creationDate: Date,
};

export type ForumTheme = {
  id: number,
  name: string,
  messages: ForumMessage[],
};

export type Forums = {
  id: number,
  name: string,
  countAnswer: number,
};

class ForumApi {
  private axiosInstance = axios?.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  public getThemes: () => Promise<Forums[]> = async () =>  {
    const { data } = await this.axiosInstance.get('/forum');

    return data;
  }

  public getMessages: (id: number) => Promise<ForumTheme> = async (id: number) => {
    const { data } = await this.axiosInstance.get(`/forum/${id}`);

    return data;
  }

  public createTheme: (name: string) => Promise<ForumTheme> = async (name: string) => {
    const { data } = await  this.axiosInstance.post('/forum', { name });

    return data;
  }

  public createMessage: (id: number, text: string, userName: string) => Promise<ForumMessage>
    = async (id: number, text: string, userName: string) => {
    const { data } = await this.axiosInstance.post(`/forum/${id}`, {
      text, userName,
    });

    return data;
  }

}

export const forumApi = new ForumApi();