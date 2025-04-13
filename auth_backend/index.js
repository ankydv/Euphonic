import { config } from 'dotenv';
config();
import express, { json } from "express";
import connectToMongo from "./db.js";
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import songRoutes from './routes/song.route.js';
import verificationRoutes from './routes/verification.route.js';
import colorRoutes from './routes/color.route.js';
import errorHandlerMiddleware from './middleware/error.middleware.js';
import http from 'http';
import setupSocket from './setupSocket.js';

connectToMongo();

const app = express();
const port =process.env.PORT || 9001 ;
const server = http.createServer(app);

setupSocket(server);

app.use(cors())
app.use(json());

// availabel routes
app.use("/api/auth", userRoutes);
app.use("/api/songs", songRoutes);
app.use('/api/verifications', verificationRoutes);
app.use('/api/colors', colorRoutes);
app.use(errorHandlerMiddleware);
app.get('/', async (req, res) => {
  res.send('Hello')
})

server.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});


export default [app];