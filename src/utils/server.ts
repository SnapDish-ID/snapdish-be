import express from 'express';
import cors from 'cors';

const createServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  return app;
}

export default createServer;