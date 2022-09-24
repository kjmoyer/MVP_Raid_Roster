import { } from 'dotenv/config'
import pg from 'pg';
const Client = pg.Client;

(async function createDatabase() {
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: 'postgres',
    password: process.env.PW,
    port: process.env.PORT,
  })
  await client.connect();
  await client.query(`DROP DATABASE IF EXISTS ${process.env.DATABASE}`);
  await client.query(`CREATE DATABASE ${process.env.DATABASE} WITH ENCODING 'UTF8';`);
  await client.end();
})();

(async function createTables() {
  const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PW,
    port: process.env.PORT,
  })

  await client.connect()
  await client.query(`CREATE TABLE buffs (
    buffId SERIAL PRIMARY KEY,
    effect TEXT,
    buffIcon TEXT
    )`)

  await client.query(`CREATE TABLE specs (
      specId INT PRIMARY KEY,
      className TEXT,
      specName TEXT,
      specIcon TEXT,
      buffs INT[]
      )`)
  await client.query(`CREATE TABLE characters (
        charId SERIAL PRIMARY KEY,
        name TEXT,
        class TEXT,
        specId int references specs(specId),
        guildMember bool
        )`)


  await client.end();
})();

