const dotenv=require('dotenv');
dotenv.config();
const express = require("express");
const connectToMongo = require("./db");
var cors = require('cors')
const { transporter, fromEmails } = require('./routes/mailerConfig');
const jwt = require("jsonwebtoken");
const User = require('./models/User');
const createJwtToken = require('./token');
// database connection
connectToMongo();
const app = express();
const port =process.env.PORT || 9001 ;
const fs = require('fs');
const path = require('path');


app.use(cors())
app.use(express.json());

// availabel routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/songs", require("./routes/songs"));
app.use('/api/verifications', require('./routes/verifications'));
app.use('/api/colors', require('./routes/colors'));
app.use('/api/payment', require('./routes/paypment'));
app.get('/', async (req, res) => {
  res.send('Hello')
})

app.get("/users/all", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json({ users: allUsers });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.get("/users/single", async (req, res) => {
  try {
    const user = await User.findById(req.body.id).select("-password");
    const token = createJwtToken(user);
    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

app.post("/api/user/mail", async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({
    email,
  }).select("-password");
  
  if (!user) {
    return res.json({ error: "User not found" });
  }
  const token = createJwtToken(user._id);
  const link = `${process.env.FRONTEND_URL}/resetpassword?token=${token}`
  try {
    const innerPath = path.resolve(__dirname, './UItemplates/resetPassword.html');
    let innerTemplate = fs.readFileSync(innerPath, 'utf-8');
    innerTemplate = innerTemplate.replace('{{link}}', link);
    const filePath = path.resolve(__dirname, './UItemplates/generalEmail.html');
    let htmlTemplate = fs.readFileSync(filePath, 'utf-8');
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
    const payload = jwt.verify(token, "ASIUDOASNDUH(*@HQIENDQ");
    const user = await User.findById(payload.user).select("-password");
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


module.exports = [app, transporter];