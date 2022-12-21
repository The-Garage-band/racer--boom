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

function getBaseUrl (): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return `${window.location.protocol}//${window.location.hostname}/`;
}

class ForumApi {
  private axiosInstance = axios?.create({
    baseURL: getBaseUrl(),
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

  public editTheme: (id:number, name: string) => Promise<ForumTheme> = async (id:number, name: string) => {
    const { data } = await  this.axiosInstance.put(`/forum/${id}`, {name});

    return data;
  }

  public createMessage: (id: number, text: string, userName: string) => Promise<ForumMessage>
      = async (id: number, text: string, userName: string) => {
    const { data } = await this.axiosInstance.post(`/forum/${id}`, {
      text, userName,
    });

    return data;
  }

  public editMessage: (id: number, text: string) => Promise<ForumMessage>
      = async (id: number, text: string) => {
    const { data } = await this.axiosInstance.put(`/forum/msg/${id}`, {text});

    return data;
  }

  public deleteMessage: (id:number) => Promise<ForumMessage> = async (id:number) => {
    const { data } = await  this.axiosInstance.delete(`/forum/msg/${id}`);

    return data;
  }

}

export const forumApi = new ForumApi();
