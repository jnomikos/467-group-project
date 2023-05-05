/*
"finalized quotes can be retrieved, line items added, edited or removed, and prices
can be changed. A discount can be given either as percentage or amount. All line
items and the discount are computed into the final price quoted. The secret notes
added by the sales associate can be reviewed, and new ones added. The quotes
are updated in the quote database: either left unresolved, or sanctioned.
Sanctioned quotes are considered complete and sent out via e-mail to the
customer. The email contains all quote data except the secret notes"
*/

 //Path: routes\finalizeQuote.js
// Compare this snippet from routes\finalizeQuote.js:
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2');
let db = new sqlite3.Database('database/mydatabase.db');

router.get("/", async (req, res) => {
    console.log("Finalize Quote");
    let session = req.session;
    if(!session.username){
        res.redirect('/');
    } else{
        const employee = await getLoggedEmployee(session);
        console.log(employee);

        let quotes = await grabQuotes(employee[0].employeeID);
        console.log(quotes);

        res.render("finalizeQuote", {loggedOn: true, username: session.username, employee: employee[0], quotes: quotes});
    }
});

router.post("/convertQuote", (req, res) => {
    console.log("Finalize Quote");
    const quoteID = req.body.quoteID;
    const customerID = req.body.customerID;
    const employeeID = req.body.employeeID;
    const customerEmail  = req.body.customerEmail;
    const paymentInfo = req.body.paymentInfo;
    const price = req.body.price;
    const description = req.body.description;
    const status = sanctioned;

    let query = `UPDATE quote SET customerID = "${customerID}", employeeID = "${employeeID}", customerEmail = "${customerEmail}", paymentInfo = "${paymentInfo}", price = "${price}", description = "${description}", status = "${status}" WHERE quoteID = "${quoteID}"`;
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err);
        }
        else { res.redirect('/convertQuote'); }
        res.render("finalizeQuote", {rows: rows});
    });
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

async function grabQuotes(employeeID) {
    console.log(employeeID)
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM quote WHERE employeeID = '${employeeID}' AND status = 'Finalized'`, (err, rows) => {
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        });
    });
}

async function getLoggedEmployee(session) {
    console.log(session.username)
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM employee WHERE isAdmin = 0 AND username = '${session.username}'`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = router;