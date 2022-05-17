import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import userRouter from './routes/user-route';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

const port = process.env.port || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Mongo DB connected and Server up on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
