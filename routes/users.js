// Create a new router
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// GET /register
router.get('/register', function (req, res, next) {
    res.render('register.ejs');
});

// POST /registered
router.post('/registered', function (req, res, next) {

    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    const username = req.body.username;
    const plainPassword = req.body.password; // must stay inside the route for security reasons

    // Hash the password before saving it
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).send("Server error hashing password");
        }

        // Insert into MySQL
        const sql = `
            INSERT INTO users (username, firstName, lastName, email, hashedPassword) 
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sql, [username, first, last, email, hashedPassword], function(err, result) {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send("Server error saving user");
            }

             // Build the result string
            let output = 'Hello ' + first + ' ' + last + ', you are now registered! ';
            output += 'We will send an email to you at ' + email + '.<br><br>';
            output += 'Your password is: ' + plainPassword + '<br>';
            output += 'Your hashed password is: ' + hashedPassword;

            // Success message
            res.send(output);
        });
    });
});

// Export router
module.exports = router;

