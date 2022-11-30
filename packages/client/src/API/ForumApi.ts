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
  creationUser: number,
  messages: ForumMessage[],
};

export type Forums = {
  id: number,
  name: string,
  countAnswer: number,
  creationUser: number,
  creationDate: Date
};

class ForumApi {
  private axiosInstance = axios?.create({
    baseURL: 'http://localhost:3001',
    // baseURL: `${window.location.protocol}//${window.location.hostname}:3001/`,
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

  public createTheme: (name: string, creationUser:number) => Promise<ForumTheme> = async (name: string, creationUser:number) => {
    const { data } = await  this.axiosInstance.post('/forum', { name, creationUser });

    return data;
  }

  public deleteTheme: (id:number) => Promise<ForumTheme> = async (id:number) => {
    const { data } = await  this.axiosInstance.delete(`/forum/${id}`);

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
