import { config } from 'dotenv';
config();
import express, { json } from "express";
import connectToMongo from "./db.js";
import cors from 'cors';
connectToMongo();
const app = express();
const port =process.env.PORT || 9001 ;

import userRoutes from './routes/user.route.js';
import songRoutes from './routes/song.route.js';
import verificationRoutes from './routes/verification.route.js';
import colorRoutes from './routes/color.route.js';
import errorHandlerMiddleware from './middleware/error.middleware.js';
import { clerkMiddleware } from '@clerk/express';


app.use(cors())
app.use(json());
app.use(clerkMiddleware());

// availabel routes
app.use("/api/auth", userRoutes);
app.use("/api/songs", songRoutes);
app.use('/api/verifications', verificationRoutes);
app.use('/api/colors', colorRoutes);
app.use(errorHandlerMiddleware);
app.get('/', async (req, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`inotebook backend listening at http://localhost:${port}`);
});


export default [app];