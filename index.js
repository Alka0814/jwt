const express = require("express");
const cookieParser = require("cookie-parser");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const {BlogRouter}=require("./routes/blog.route");
const { auth } = require("./middlewares/auth");

const session = require("express-session");
require("dotenv").config();



const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    resave: true,
    secret: "your secret",
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send("PSC");
});

app.use("/auth", userRouter);
app.use("/blog",BlogRouter)



app.get("/protected", auth, (req, res) => {
  res.send("Protected data");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDb");
  } catch (err) {
    console.log("Not able to connected to MongoDb");
    console, log(err);
  }

  console.log(`Server is running on ${process.env.port}`);
});