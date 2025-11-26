// Create a new router
const express = require("express")
const router = express.Router()

// Middleware to protect routes
const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('/users/login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}


router.get('/search',function(req, res, next){
    res.render("search.ejs")
});

router.get('/search-result', function (req, res, next) {
    //searching in the database
    res.send("You searched for: " + req.query.keyword)
});

// This route displays the list of all books (GET)
router.get('/list', redirectLogin, function(req, res, next) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err)
            }
            res.render("list.ejs", {availableBooks:result})
         });
    });

// This route displays the form to add a new book (GET)
router.get('/addbook', redirectLogin,  function(req, res) {
    res.render('addbook.ejs', { session: req.session });
});


// The form submits to this route (POST)
router.post('/bookadded', redirectLogin, function (req, res, next) {
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
    let newrecord = [req.body.name, req.body.price];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.send(
                'This book is added to database, name: ' +
                req.body.name + ' price ' + req.body.price
            );
        }
    });
});

// LIST all books priced under £20
router.get('/bargainbooks', function(req, res, next) {

    let sqlquery = "SELECT * FROM books WHERE price < 20";

    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.render("bargainbooks.ejs", { cheapBooks: result });
        }
    });
});



// Export the router object so index.js can access it
module.exports = router
