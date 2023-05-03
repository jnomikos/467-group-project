/*
"The third interface (also in-house) allows to convert a quote into a purchase order
once the customer has indicated to go ahead with the order (the go ahead is
given outside of the scope of this system, e.g. via phone or snail mail). At this
time an additional final discount can be entered. The final amount is computed.
The purchase order is then sent to an external processing system (details
provided later) which answers with a processing date and sales commission rate
for the sales associate. The commission is computed and recorded for the quote
and in the sales associates accumulated commission. An email is sent to the
customer with all the purchase details, including the processing date."
*/

// Path: routes\convertQuote.js
// Compare this snippet from routes\convertQuote.js:
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2');


// Open database
let db = new sqlite3.Database('database/mydatabase.db');

router.get("/", (req, res) => {
    console.log("Convert Quote");
        db.all(`SELECT * FROM quote where status = finalized`, (err, rows) => {
            if (err) {
                console.log(err);
            }
            res.render("convertQuote", {rows: rows});
        }
    );
});

router.post("/convertQuote", (req, res) => {
    console.log("Convert Quote");
    const quoteID = req.body.quoteID;
    const customerID = req.body.customerID;
    const employeeID = req.body.employeeID;
    const customerEmail  = req.body.customerEmail;
    const paymentInfo = req.body.paymentInfo;
    const price = req.body.price;
    const description = req.body.description;
    const status = ordered;

    let query = `UPDATE quote SET customerID = "${customerID}", employeeID = "${employeeID}", customerEmail = "${customerEmail}", paymentInfo = "${paymentInfo}", price = "${price}", description = "${description}", status = "${status}" WHERE quoteID = "${quoteID}"`;
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err);
        }
        res.render("convertQuote", {rows: rows});
    });
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;