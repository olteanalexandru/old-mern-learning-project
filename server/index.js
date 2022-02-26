//routing framework
import express from 'express';
//enabling sending post requests:
import bodyParser from 'body-parser';
//creating models 
import mongoose from 'mongoose';
//cross origin requests
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();
//limiting images to 30MB
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
//Router call:
app.use('/posts', postRoutes);
app.use("/user", userRouter);


const CONNECTION_URL = 'mongodb+srv://javascriptmastery:delaunulaopt@cluster0.qwi0c.mongodb.net/myFirstDatabase?';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL , { useNewUrlParser: true, useUnifiedTopology: true })
//returning a promise
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);