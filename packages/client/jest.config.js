import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  //testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  modulePaths: ["src"],
  moduleNameMapper: {
    '\\.(css|less|png|jpg)$': 'identity-obj-proxy',

    "^@\/(.*)$": "<rootDir>/src/$1",
    "^public\/(.*)$": "<rootDir>/public/$1",
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
