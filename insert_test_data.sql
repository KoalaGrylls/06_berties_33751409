# Insert data into the tables

USE berties_books;

INSERT INTO books (name, price)VALUES('Brighton Rock', 20.25),('Brave New World', 25.00), ('Animal Farm', 12.99) ;


USE berties_books;

INSERT INTO users (username, firstName, lastName, email, hashedPassword) VALUES ('gold', 'Gold', 'User', 'gold@example.com', '$2b$10$abc123abc123abc123abc123abc123abc123abc123abc123abc123');