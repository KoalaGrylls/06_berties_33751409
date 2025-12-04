
const express = require('express');
const router = express.Router();

router.get('/books', function (req, res, next) {

    // read query parameters
    let search = req.query.search;
    let minprice = req.query.minprice;     
    let max_price = req.query.max_price;      
    let sort = req.query.sort;                

    // base query
    let sqlquery = "SELECT * FROM books WHERE 1=1";
    let params = [];

    // search filter
    if (search) {
        sqlquery += " AND name LIKE ?";
        params.push("%" + search + "%");
    }

    // minimum price filter
    if (minprice) {
        sqlquery += " AND price >= ?";
        params.push(Number(minprice));
    }

    // maximum price filter
    if (max_price) {
        sqlquery += " AND price <= ?";
        params.push(Number(max_price));
    }

    // sorting
    if (sort) {
        const allowedSort = ["name", "price"]; // allowed fields
        if (allowedSort.includes(sort)) {
            sqlquery += ` ORDER BY ${sort} ASC`;  // default ascending
        }
    }

    db.query(sqlquery, params, (err, result) => {
        if (err) {
            res.json(err);
            next(err);
        } else {
            res.json(result);
        }
    });
});



module.exports = router;


