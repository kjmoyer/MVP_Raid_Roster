import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { } from 'dotenv/config';
const Client = pg.Client;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../index.html')))

app.get('/chars', async (req, res) => {
  const client = new Client({
    user: import.meta.env.VITE_USER,
    host: import.meta.env.VITE_HOST,
    database: import.meta.env.VITE_DATABASE,
    password: import.meta.env.VITE_PW,
    port: import.meta.env.VITE_PORT,
  })
  await client.connect();
  await client.query(`SELECT * FROM characters WHERE guildMember = ${req.query.guildMember}`)
    .then((data) => {
      res.status(200).send
    })
    .catch((err) => {
      console.log(err)
    })
  await client.end()
});



app.listen(3000, () => {
  console.log('Listening on port 3000')
});