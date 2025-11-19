Bertie’s Books

This project is based on the initial Bertie’s Books starter code.

Setup
git clone https://github.com/KoalaGrylls/06_berties_33751409
cd 06_berties_33751409/berties-books
npm install
npm start

Usage

Open http://localhost:8000 in your browser.

Tech

Node.js, Express, EJS, JavaScript, CSS, MySQL 

Dotenv

I used the dotenv module to keep my database login details secure.

Installed dotenv:

npm install dotenv


Created a .env file and stored my database settings inside it.

Added this line at the top of index.js to load the values:

require('dotenv').config();


Updated the database connection to use process.env instead of hard-coded values.

Added .env to .gitignore so it is not uploaded to GitHub.
