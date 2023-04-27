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
 router.get("/finalizeQuote", (req, res) => {
     console.log("Finalize Quote");
        db.all(`SELECT * FROM quote`, (err, rows) => {
            if (err) {
                console.log(err);
            }
            res.render("finalizeQuote", {rows: rows});
        }
    );
});

router.post("/finalizeQuote", (req, res) => {
    console.log("Finalize Quote");
    const quoteID = req.body.quoteID;
    const customerID = req.body.customerID;
    const employeeID = req.body.employeeID;
    const customerEmail  = req.body.customerEmail;
    const paymentInfo = req.body.paymentInfo;
    const price = req.body.price;
    const description = req.body.description;
    const discount = req.body.discount;
    const finalPrice = req.body.finalPrice;

    let query = `UPDATE quote SET customerID = "${customerID}", employeeID = "${employeeID}", customerEmail = "${customerEmail}", paymentInfo = "${paymentInfo}", price = "${price}", description = "${description}", discount = "${discount}", finalPrice = "${finalPrice}" WHERE quoteID = "${quoteID}"`;
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err);
        }
        res.render("finalizeQuote", {rows: rows});
    });
});
