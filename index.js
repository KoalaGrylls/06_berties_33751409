// Import express and ejs
require('dotenv').config();
var express = require ('express')
var ejs = require('ejs')
var mysql = require('mysql2');
const path = require('path')
var session = require('express-session');
const { check, validationResult } = require('express-validator');
const expressSanitizer = require('express-sanitizer');
const request = require('request')

// Define the database connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: process.env.BB_USER,
    password: process.env.BB_PASSWORD,
    database: process.env.BB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Make the DB accessible everywhere
global.db = db;


// Create the express application object
const app = express()
const port = 8000

// Set up the session
app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs')

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

// Set up public folder (for css and static js)
app.use(express.static(path.join(__dirname, 'public')))

// Set up express-sanitizer
app.use(expressSanitizer());

// Define our application-specific data
app.locals.shopData = {shopName: "Bertie's Books"}

// Load the route handlers for /users
const usersRoutes = require('./routes/users')
app.use('/users', usersRoutes)

// Load the route handlers for /books
const booksRoutes = require('./routes/books')
app.use('/books', booksRoutes)

// Load the route handlers (Had a problem where if this was loaded first, the /books/addbook route would still be able to be accessed without login)
const mainRoutes = require("./routes/main")
app.use('/', mainRoutes)

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`))