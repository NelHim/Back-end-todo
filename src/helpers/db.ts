import { Config, JsonDB } from 'node-json-db';

export const db = new JsonDB(new Config('todoDB', true, true, '/'));

export const initilizeDB = async () => {
  if (!(await db.exists('/categories'))) db.push('/categories', []);
  if (!(await db.exists('/tasks'))) db.push('/tasks', []);
};
