var express = require("express");
var router = express.Router();

require("dotenv").config(); // To load CLIENT_ID and CLIENT_SECRET from .env file

/* GET home page. */
router.get("/getAccessToken", async function (req, res, next) {
  //   res.render("index", { title: "Express" });

  req.query.code;

  // console.log(req.query.code);

  const params =
    "?client_id=" +
    process.env.CLIENT_ID +
    "&client_secret=" +
    process.env.CLIENT_SECRET +
    "&code=" +
    req.query.code;
  await fetch("https://github.com/login/oath/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});

router.get("/getUserData", async function (req, res, next) {
  req.get("Authorization");
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), // bearer ACCESS TOKEN
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
});



module.exports = router;
