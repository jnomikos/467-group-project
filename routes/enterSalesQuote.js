const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2');

// Open database
let db = new sqlite3.Database('database/mydatabase.db');


//allow employees to enter sales quotes
router.get("/", (req, res) => {
    console.log("Enter Sales Quote");
    let session = req.session;
    if(!session.username) {
        res.redirect('/');
    } else {
        const connection = mysql.createConnection({
            host: 'blitz.cs.niu.edu',
            user: 'student',
            password: 'student',
            database: 'csci467',
            port: '3306'
        });
    
        connection.query(
        'SELECT * FROM `customers`',
        function(err, results, fields) {
            if(err) {
                console.error(err);
                res.redirect('/');
                return;
            }

            res.render("enterQuote", {loggedOn: true, username: session.username, customers: results});
        });
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

    db.run(`INSERT INTO quote (customerID, employeeID, customerEmail, paymentInfo, price, description) VALUES ("${customerID}", "${employeeID}", "${customerEmail}", "${paymentInfo}", "${price}", "${description}")`, (err) => {
    if (err) {
            console.log(err);
        }
        res.redirect("/enterSalesQuote");
    });

    //redirect to finalize sales quote page
    res.redirect("/finalizeQuote");
});

module.exports = router;