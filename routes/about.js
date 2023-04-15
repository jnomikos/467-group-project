const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    console.log("About");
    res.render("about", {text: "Test"});
});


module.exports = router;