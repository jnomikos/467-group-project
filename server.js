const express = require("express");
const app = express();

// Sets our view engine for express which is ejs.

app.set('view engine', 'ejs');

// Whenever a user sends a get request (loads up webpage) at index, we will render index.html
app.get("/", (req, res) => {
    console.log("Here");
    res.render("index", {text: "Test"});
});

// The about page
const aboutRouter = require('./routes/about');
app.use('/about', aboutRouter);

// Login page
const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

// Choose what port the server will be on. If running this on your local machine, type localhost:3000 in your browser
app.listen(3000);