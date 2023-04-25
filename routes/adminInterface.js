const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Open database
let db = new sqlite3.Database('database/mydatabase.db');

router.get("/", (req, res) => {
    console.log("Admin");
    res.render("adminInterface");
});

router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    checkValidAdmin(username, password).then(isValid => {
        if(isValid) {
            let session=req.session;
            session.username=req.body.username;
            res.redirect('/adminInterface');
        } else {
            res.render("adminInterface", {warning: "Invalid username or password!", username: username, password: password});
        }
    })
   
});



// access all employee info and allow admin to edit
router.get("/employee", (req, res) => {
    console.log("Employee");
    db.all(`SELECT * FROM employee`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        res.render("employee", {rows: rows});
    });
});

//allow admin to add new employee
router.post("/employee", (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const contact = req.body.contact;
    const commission = req.body.commission;

    db.run(`INSERT INTO employee (name, password, address, city, state, contact, commission) VALUES ("${name}", "${password}", "${address}", "${city}", "${state}", "${contact}", "${commission}")`, (err) => {
    if (err) {
            console.log(err);
        }
        res.redirect("/adminInterface/employee");
    });
});

//allow admin to add, edit, and delete employees
router.get("/employee/:id", (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM employee WHERE id = "${id}"`, (err, row) => {
        if (err) {
            console.log(err);
        }
        res.render("employeeEdit", {row: row});
    });
});

router.post("/employee/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const password = req.body.password;
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const contact = req.body.contact;
    const commission = req.body.commission;

    db.run(`UPDATE employee SET name = "${name}", password = "${password}", address = "${address}", city = "${city}", state = "${state}", contact = "${contact}", commission = "${commission}" WHERE id = "${id}"`, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/adminInterface/employee");
    });
});

router.get("/employee/delete/:id", (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM employee WHERE id = "${id}"`, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/adminInterface/employee");
    });
});

//allow admin to search and view quotes based on status, date range, employee, and customer
router.get("/quote", (req, res) => {
    console.log("Quote");
    db.all(`SELECT * FROM quote`, (err, rows) => {
        if (err) {
            console.log(err);
        }
        res.render("quote", {rows: rows});
    });
});

//allow admin to find specific quotes
router.post("/quote", (req, res) => {
    const status = req.body.status;
    const date1 = req.body.date1;
    const date2 = req.body.date2;
    const employee = req.body.employee;
    const customer = req.body.customer;

    let query = `SELECT * FROM quote WHERE status = "${status}" AND date BETWEEN "${date1}" AND "${date2}" AND employee = "${employee}" AND customer = "${customer}"`;

    if (status == "All") {
        query = `SELECT * FROM quote WHERE date BETWEEN "${date1}" AND "${date2}" AND employee = "${employee}" AND customer = "${customer}"`;
    }

    if (employee == "All") {
        query = `SELECT * FROM quote WHERE status = "${status}" AND date BETWEEN "${date1}" AND "${date2}" AND customer = "${customer}"`;
    }

    if (customer == "All") {
        query = `SELECT * FROM quote WHERE status = "${status}" AND date BETWEEN "${date1}" AND "${date2}" AND employee = "${employee}"`;
    }

    if (status == "All" && employee == "All") {
        query = `SELECT * FROM quote WHERE date BETWEEN "${date1}" AND "${date2}" AND customer = "${customer}"`;
    }

    if (status == "All" && customer == "All") {
        query = `SELECT * FROM quote WHERE date BETWEEN "${date1}" AND "${date2}" AND employee = "${employee}"`;
    }

    if (employee == "All" && customer == "All") {
        query = `SELECT * FROM quote WHERE status = "${status}" AND date BETWEEN "${date1}" AND "${date2}"`;
    }

    if (status == "All" && employee == "All" && customer == "All") {
        query = `SELECT * FROM quote WHERE date BETWEEN "${date1}" AND "${date2}"`;
    }

    if (status == "All" && employee == "All" && customer == "All" && date1 == "" && date2 == "") {
        query = `SELECT * FROM quote`;
    }

    db.all(query, (err, rows) => {
        if (err) {
            console.log(err);
        }
        res.render("quote", {rows: rows});
    });
});

module.exports = router;