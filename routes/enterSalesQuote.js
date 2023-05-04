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

        connection.query(
        'SELECT * FROM `customers`',
        function(err, results, fields) {
            if(err) {
                console.error(err);
                res.redirect('/');
                return;
            }


            res.render("enterQuote", {loggedOn: true, username: session.username, customers: results, employee: employee[0]});
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
    const status = "sanctioned";

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


            db.run(`INSERT INTO quote (customerID, employeeID, customerEmail, paymentInfo, price, description, status, dateCreated) VALUES ("${results[0].id}", "${employeeID}", "${customerEmail}", "${paymentInfo}", "${price}", "${description}", "${status}", "${formattedDate}")`, (err) => {
                if (err) {
                    console.log(err);
                    res.redirect("/enterSalesQuote");
                }
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

module.exports = router;