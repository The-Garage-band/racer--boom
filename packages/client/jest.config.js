import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  //testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  modulePaths: ['src'],
  moduleNameMapper: {
    '\\.(css|less|png|jpg|mp3)$': 'identity-obj-proxy',

    '^@/(.*)$': '<rootDir>/src/$1',
    '^public/(.*)$': '<rootDir>/public/$1',
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts'
  ],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
