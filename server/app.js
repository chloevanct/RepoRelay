var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const connectDB = require("./db/connection");

var projectsRouter = require("./routes/projects");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config(); // To load CLIENT_ID and CLIENT_SECRET from .env file

var indexRouter = require("./routes/index");

const userRouter = require("./routes/user");

connectDB();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
// app.use("/users", usersRouter);

// app.use("/auth", usersRouter);

app.use("/user", userRouter);

app.use("/projects", projectsRouter);

app.get("/oauth/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    const accessToken = response.data.access_token;

    console.log(response.data);

    res.redirect(`http://localhost:5173?token=${accessToken}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
