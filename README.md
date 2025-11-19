**Bertie’s Books**

This project is based on the initial Bertie’s Books starter code.

**Setup**
git clone https://github.com/KoalaGrylls/06_berties_33751409
cd 06_berties_33751409/berties-books
npm install
npm start

**Usage**

Open http://localhost:8000 in your browser.

**Tech**

Node.js, Express, EJS, JavaScript, CSS, MySQL 

**Dotenv**

I used the dotenv module to keep my database login details secure.

Installed dotenv:

npm install dotenv

Created a .env file and stored my database settings inside it.

Added this line at the top of index.js to load the values:

require('dotenv').config();


Updated the database connection to use process.env instead of hard-coded values.

Added .env to .gitignore so it is not uploaded to GitHub.


**Fixing the "Access denied" Database Error**

When I first tested my project on the VM, I got the MySQL error:

Access denied for user ''@'localhost' (using password: NO)

This happened because the VM did not have a .env file, so the database username and password were empty. Without valid credentials, MySQL refused the connection.

I think this was because i added .env to .gitignore

How I fixed it

I used nano on the VM to create a new .env file:

nano .env

Inside the file, I added my database environment variables:

BB_USER=
BB_PASSWORD=
BB_DATABASE=

I saved the file in nano.

Then I restarted my Node.js app so it could load the updated .env file.

After doing this, the database connection worked correctly.
