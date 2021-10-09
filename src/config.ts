import { config } from 'dotenv';
import path from 'path';

/** init .env variables */
config({
  path: path.resolve(__dirname, '../.env')
});

/** get source from env variable with assert if not provided */
export const assertGet: <T>(property: string, source: any) => T = <T>(property: string, source: any) => {
  const data = source[property] as any as T
  if (data)
    return data
  else
    throw new Error(`${property} isn't provided!`)
}

export const getConfig = () => ({
  PORT: assertGet<number>('PORT', process.env),
  JWT_SECRET: assertGet<string>('JWT_SECRET', process.env),
  MONGO_URI: assertGet<string>('MONGO_URI', process.env),
  INIT_USER_LOGIN: assertGet<string>('INIT_USER_LOGIN', process.env),
  INIT_USER_PASSWORD: assertGet<string>('INIT_USER_PASSWORD', process.env),
  MODE: assertGet<string>('MODE', process.env)
})