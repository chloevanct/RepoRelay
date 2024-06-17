var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/getAccessToken", function (req, res, next) {
  //   res.render("index", { title: "Express" });

  req.query.code;
  await fetch("https://github.com/login/oath/access_tooken");
});

module.exports = router;
