import {AxiosInstance} from "@/API/AxiosInstance";
import {PATH_CURRENT_LEADERBOARD, PATH_LEADERBOARD, TEAM_NAME} from "@/constants";

export interface ILeaderboard {
  point: number,
  name: string,
  avatar: string,
}

interface ILeaderboardResponse {
  data: Array<{
    data: ILeaderboard,
  }> ,
}

export const addLeaderboardItem = (data: ILeaderboard) => AxiosInstance.post<string>(PATH_LEADERBOARD, {
  data,
  ratingFieldName: 'point',
  teamName: TEAM_NAME,
});

export const getLeaderboardList = (limit: number) => AxiosInstance.post(PATH_CURRENT_LEADERBOARD, {
  ratingFieldName: 'point',
  cursor: 0,
  limit,
}).then((response: ILeaderboardResponse) => response.data.map(({ data }) => data));