const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2');

// Open database
let db = new sqlite3.Database('database/mydatabase.db');

const connection = mysql.createConnection({
    host: 'blitz.cs.niu.edu',
    user: 'student',
    password: 'student',
    database: 'csci467',
    port: '3306'
});

//allow employees to enter sales quotes
router.get("/", async (req, res) => {
    console.log("Enter Sales Quote");
    let session = req.session;
    if(!session.username) {
        res.redirect('/');
    } else {
        
        const employee = await getLoggedEmployee(session);
        console.log(employee)

        const quotes = await getQuotes(employee[0].employeeID);
        let customerNames = [];
        console.log(quotes)
        connection.query(
        'SELECT * FROM `customers`',
        function(err, results, fields) {
            if(err) {
                console.error(err);
                res.redirect('/');
                return;
            }

            for(let i = 0; i < results.length; i++) {
                customerNames.push(results[i].name);
            }


            res.render("enterQuote", {loggedOn: true, username: session.username, customers: results, customerNames: customerNames, employee: employee[0], quotes: quotes});
        });
    }
});


//allow employees to enter sales quotes
router.post("/enter_quote", (req, res) => {
    const customerName = req.body.customerName;
    const employeeID = req.body.employeeID;
    const customerEmail = req.body.customerEmail;
    const paymentInfo = req.body.customerPaymentInfo;
    const price = req.body.price;
    const description = req.body.description;

    console.log(employeeID);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1 and pad with '0'
    const day = String(currentDate.getDate()).padStart(2, '0'); // Pad with '0' if needed

    const formattedDate = `${year}-${month}-${day}`;

    connection.query(
        `SELECT * FROM \`customers\` WHERE \`name\` = '${customerName}'`,
        function(err, results, fields) {
            if(err) {
                console.error(err);
                res.redirect('/');
                return;
            }


            db.run(`INSERT INTO quote (customerID, employeeID, customerEmail, paymentInfo, price, description, dateCreated) VALUES ("${results[0].id}", "${employeeID}", "${customerEmail}", "${paymentInfo}", "${price}", "${description}", "${formattedDate}")`, (err) => {
                if (err) {
                    console.log(err);
                    res.redirect("/");
                }
            });


        }
    );

    res.redirect("/enterSalesQuote");
});

//allow employees to enter sales quotes
router.post("/finalize_quote", (req, res) => {
    const customerName = req.body.customerName;
    const employeeID = req.body.employeeID;
    const quoteID = req.body.quoteID;
    const customerEmail = req.body.customerEmail;
    const paymentInfo = req.body.customerPaymentInfo;
    const price = req.body.price;
    const description = req.body.description;
    const status = "Finalized";

    console.log(employeeID);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so we add 1 and pad with '0'
    const day = String(currentDate.getDate()).padStart(2, '0'); // Pad with '0' if needed

    const formattedDate = `${year}-${month}-${day}`;
    console.log("price: " + price)
    console.log("Customer name: " + customerName)
    connection.query(
        `SELECT * FROM \`customers\` WHERE \`name\` = '${customerName}'`,
        function(err, results, fields) {
            if(err || results.length == 0) {
                console.error(err);
                res.redirect('/');
                return;
            }

            let query = `UPDATE quote SET customerEmail = "${customerEmail}", paymentInfo = "${paymentInfo}", price = "${price}", description = "${description}", status = "${status}" WHERE quoteID = "${quoteID}"`;
            db.all(query, (err, rows) => {
                if (err) {
                    console.log(err);
                }
                res.render("finalizeQuote", {rows: rows});
            });


        }
    );

    //redirect to finalize sales quote page
    res.redirect("/finalizeQuote");
});


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

async function getQuotes(employeeID) {
    console.log(employeeID)
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM quote WHERE employeeID = '${employeeID}' AND status = 'unresolved'`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = router;