import MockAdapter from "axios-mock-adapter";

import { URL_API, PATH_GET_USER, PATH_UPDATE_PROFILE } from '@/constants';

import { getUser, updateProfile } from './User';
import { AxiosInstance } from './AxiosInstance';
import type { IProfile } from './User';

const profile: IProfile = {
  first_name: "First",
  second_name: "Second",
  display_name: "Display",
  login: "Login",
  email: "abracadabra@brara.com",
  phone: "1231235345",
  avatar: "bzbxcvbxcvb.jpg",
};

describe('Api test series', () => {

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(AxiosInstance);
  });

  afterEach(() => {
    mock.reset();
  });

  test('Should be get user data', async () => {
    mock.onGet(`${URL_API}${PATH_GET_USER}`).reply(200, profile);

    const result = await getUser();

    expect(result.data).toEqual(profile);
  });

  test('Should be updated profile', async () => {
    mock.onPut(`${URL_API}${PATH_UPDATE_PROFILE}`, profile).reply(200, profile);

    const result = await updateProfile(profile);

    expect(result.data).toEqual(profile);
  });

});