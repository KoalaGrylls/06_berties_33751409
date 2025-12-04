// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')

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

router.get('/weather', function (req, res, next) {

    const request = require('request');

    // Default city if none provided
    let city = req.query.city || 'london';

    let apiKey = '58c647200e5ac407bf42b699c8cef78f';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {

        if (err) {
            return next(err);
        }

        let weather;
        try {
            weather = JSON.parse(body);
        } catch (jsonErr) {
            return res.send("Error reading weather data.");
        }

        // If city not found
        if (weather.cod == "404") {
            return res.render("weather.ejs", { weather: null, error: "City not found" });
        }

        // Render the weather page with data
        res.render("weather.ejs", { weather: weather });
        
    });
});



// Export the router object so index.js can access it
module.exports = router