import { config } from 'dotenv';
config();
import express, { json } from "express";
import connectToMongo from "./db.js";
import cors from 'cors';
import { transporter, fromEmails } from './configs/mailer.config.js';
import verify from "jsonwebtoken";
import createJwtToken from './token.js';
connectToMongo();
const app = express();
const port =process.env.PORT || 9001 ;
import { readFileSync } from 'fs';
import { resolve } from 'path';

import userRoutes from './routes/user.route.js';
import songRoutes from './routes/song.route.js';
import verificationRoutes from './routes/otp.route.js';
import colorRoutes from './routes/color.route.js';
import errorHandlerMiddleware from './middleware/error.middleware.js';


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

app.get("/users/all", async (req, res) => {
  try {
    const allUsers = await find({});
    res.json({ users: allUsers });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.get("/users/single", async (req, res) => {
  try {
    const user = await findById(req.body.id).select("-password");
    const token = createJwtToken(user);
    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.post("/api/user/mail", async (req, res) => {
  const email = req.body.email;
  const user = await findOne({
    email,
  }).select("-password");
  
  if (!user) {
    return res.json({ error: "User not found" });
  }
  const token = createJwtToken(user._id);
  const link = `${process.env.FRONTEND_URL}/resetpassword?token=${token}`
  try {
    const innerPath = resolve(__dirname, './UItemplates/resetPassword.html');
    let innerTemplate = readFileSync(innerPath, 'utf-8');
    innerTemplate = innerTemplate.replace('{{link}}', link);
    const filePath = resolve(__dirname, './UItemplates/generalEmail.html');
    let htmlTemplate = readFileSync(filePath, 'utf-8');
    htmlTemplate = htmlTemplate.replace('{{content}}', innerTemplate)
    const mailData = {
      from: fromEmails.verification, 
      to: email, 
      subject: "[Euphonic] Reset Password",
      text: "Click on the link below to reset Password.",
      html: htmlTemplate
    };
    transporter.sendMail(mailData);
    // const user = await User.findById(req.body.id).select("-password");
    // const token = createJwtToken(user);
    res.json({ message: "Password reset link sent successfully!" });
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.post("/api/user/validate", async (req, res) => {
  console.log("t1");
  try {
    console.log("t2");
    const token = req.query.token;
    const payload = verify(token, "ASIUDOASNDUH(*@HQIENDQ");
    const user = await findById(payload.user).select("-password");
    user.password = req.body.password;
    user.save();
    res.json({ message: "Password Changed Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`inotebook backend listening at http://localhost:${port}`);
});


export default [app, transporter];