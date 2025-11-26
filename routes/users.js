// Create a new router
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Middleware to protect routes
const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('./login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}

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


// List all users (for testing purposes)
router.get('/list', redirectLogin, function(req, res, next) {
    const sqlquery = "SELECT id, username, firstName, lastName, email FROM users"; // do not select hashedPassword
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.render("userlist.ejs", { users: result });
        }
        });
    });

// GET /login
router.get('/login', function (req, res, next) {
    res.render('login.ejs', { error: null });
});

// POST /loggedin
router.post('/loggedin', function (req, res, next) {

    const username = req.body.username;
    const plainPassword = req.body.password;

    const sql = `SELECT hashedPassword FROM users WHERE username = ?`;

    db.query(sql, [username], function (err, results) {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Server error accessing database");
        }

        if (results.length === 0) {
            // Log failed attempt
            db.query(
                "INSERT INTO login_audit (username, success, ip_address) VALUES (?, ?, ?)",
                [username, 0, req.ip]
            );

            // Stay on login page, show an error
            return res.render("login.ejs", { error: "User not found." });
        }

        const hashedPassword = results[0].hashedPassword;

        bcrypt.compare(plainPassword, hashedPassword, function (err, result) {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).send("Server error checking password");
            }

            if (result === true) {
                // Passwords match
                req.session.userId = username;

                // Log success
                db.query(
                    "INSERT INTO login_audit (username, success, ip_address) VALUES (?, ?, ?)",
                    [username, 1, req.ip]
                );

                // Go to home page
                return res.redirect('../');

            }

            // Password incorrect
            db.query(
                "INSERT INTO login_audit (username, success, ip_address) VALUES (?, ?, ?)",
                [username, 0, req.ip]
            );

            // Stay on login page with error
            res.render("login.ejs", { error: "Incorrect Login" });
        });
    });
});



// This is a route to see all login attempts 
// GET /audit - show all login attempts
router.get('/audit', redirectLogin, function (req, res, next) {

    const sql = `SELECT * FROM login_audit ORDER BY login_time DESC`;

    db.query(sql, function (err, results) {
        if (err) {
            console.error("Audit log error:", err);
            return res.status(500).send("Error retrieving audit log");
        }

        // Render a simple table
        let output = "<h1>Login Audit Log</h1>";
        output += "<table border='1' cellpadding='8'>";
        output += "<tr><th>ID</th><th>Username</th><th>Time</th><th>Success</th><th>IP Address</th></tr>";

        results.forEach(row => {
            output += `<tr>
                <td>${row.id}</td>
                <td>${row.username}</td>
                <td>${row.login_time}</td>
                <td>${row.success ? "✔ Success" : "❌ Failed"}</td>
            </tr>`;
        });

        output += "</table>";

        res.send(output);
    });
});


router.get('/logout', redirectLogin, (req,res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('../');
        }
        res.send('You are now logged out. <a href="../">Home</a>');

    });
});









// Export router
module.exports = router;

