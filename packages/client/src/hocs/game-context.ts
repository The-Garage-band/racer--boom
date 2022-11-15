import {Context, createContext} from "react";

export type TGameContextData = {
  score: number,
  healthCollected: number,
  coins: number,
}

export type TGameContext = {
  data: TGameContextData
  update: (data: Partial<TGameContextData>) => void,
}

const source = {
  score: 0,
  healthCollected: 0,
  coins: 0,
}
const update = (data: Partial<TGameContextData>) => {
  Object.assign(source, data);
}

export const GameContext: Context<TGameContext> = createContext({
  data: source,
  update,
});