import express, { Express, Router, Request, Response } from 'express';

const app: Express = express();

const route = Router();

app.use(express.json());

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello, World' });
});

app.use(route);

app.listen(3333, () => {
  console.log('⚡️[server]: server running at http://localhost:3333}');
});
