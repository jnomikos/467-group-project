const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Open database
let db = new sqlite3.Database('database/mydatabase.db');

//allow employees to enter sales quotes
router.get("/", (req, res) => {
    console.log("Enter Sales Quote");
    let session = req.session;
    if(!session.username) {
        res.redirect('/');
    } else {
        res.render("enterQuote", {loggedOn: true, username: session.username});
    }
});

//allow employees to enter sales quotes
router.post("/", (req, res) => {
    const customerID = req.body.customerID;
    const employeeID = req.body.employeeID;
    const customerEmail = req.body.customerEmail;
    const paymentInfo = req.body.paymentInfo;
    const price = req.body.price;
    const description = req.body.description;


    db.run(`INSERT INTO salesQuote (customerID, employeeID, customerEmail, paymentInfo, price, description) VALUES ("${customerID}", "${employeeID}", "${customerEmail}", "${paymentInfo}", "${price}", "${description}")`, (err) => {
    if (err) {
            console.log(err);
        }
        res.redirect("/enterSalesQuote");
    });
});

module.exports = router;

