// Create a new router
const express = require("express")
const router = express.Router()

// Handle our routes
router.get('/',function(req, res, next){
    res.render("index", { session: req.session });
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

router.get('/books/addbook', function(req, res, next){
    res.render('addbook.ejs')
});

router.get('/books/bargainbooks;',function(req, res, next){
    res.render('bargainbooks.ejs')
});


// Export the router object so index.js can access it
module.exports = router