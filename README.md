# Bertie’s Books – Coursework

This project extends the original Bertie’s Books application by adding security features such as validation, sanitisation, password hashing, session protection, and secure deployment on the university VM.

## Setup Instructions

1. Clone the repository  
2. Install dependencies with `npm install`
3. Run `node index.js` to run local
4. Use links.txt Homepage  

The app uses MySQL for data storage and EJS for server-side rendering.

## Technologies Used

- Node.js  
- Express  
- EJS  
- MySQL  
- express-validator  
- express-sanitizer  
- bcrypt  
- express-session  
- dotenv  
- forever (for VM deployment)

## Environment Variables (.env)

I used dotenv so database credentials are not stored in the code.

On the VM, I manually created:

BB_HOST=
BB_USER=
BB_PASSWORD=
BB_DATABASE= 

## Validation (express-validator)

Validation added to the registration form:

- Email must be valid  
- Username 5–20 characters  
- Password minimum 8 characters  

Invalid input returns the user to the registration page with errors.

## Sanitisation (express-sanitizer)

Before sanitisation, the form was vulnerable to XSS. After adding req.sanitize(), fields such as first name, last name, username, and email are cleaned to remove malicious HTML.

## Password Hashing (bcrypt)

Passwords are hashed before being stored. bcrypt.compare is used during login.

## Session Management

Protected pages require login. If a user is not logged in, they are redirected to the login page.

## Login Attempt Logging

A login_audit table stores username, success flag, timestamp, and IP address for every login attempt.

## SQL Injection Protection

All queries use parameterised SQL to prevent injection. 

## Deployment to VM

The app is run using:

forever start index.js

so it stays active for marking.


## API Documentation

This project includes a simple REST API that returns book data in JSON format. The API supports searching, price filtering, and sorting.

### Get all books
Returns a list of all books.

GET /api/books

Example:
http://localhost:8000/api/books

### Search books by name
Use the `search` parameter to find books whose title contains the given word.

GET /api/books?search=world

### Filter books by price range
Use `minprice` and `max_price` to return books within a price range.

GET /api/books?minprice=5&max_price=10

### Sort books
Use the `sort` parameter to sort the results.

Sort by name:
GET /api/books?sort=name

Sort by price:
GET /api/books?sort=price

### Combined example
You can combine any of the parameters:

GET /api/books?search=new&minprice=10&max_price=30&sort=price

## Summary

- Validation added  
- Sanitisation added  
- Password hashing  
- Session protection  
- Login auditing  
- SQL injection protection  
- Works on VM with forever
