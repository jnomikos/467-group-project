const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const router = express.Router();

router.get("/", (req, res) => {
    console.log("About");
    res.render("about", {text: "Test"});
});


module.exports = router;