INSERT INTO employee (name, username, password, address, city, state, contact, commission, isAdmin) VALUES 
('Bob Williams', 'Bob', 'password', '1234 West St', 'Dekalb', 'Illinois', '123-456-7890', 35, 1),
('Sally Smith', 'Sally', 'password', '1234 East St', 'Dekalb', 'Illinois', '256-726-7361', 40, 1);


INSERT INTO employee(name, username, password, address, city, state, contact, commission) VALUES
('Bobbie Hill', 'Bobbie', 'password', '800 North street', 'Chicago', 'Illinois', '779-456-1264', 10),
('Sam Johnson', 'SamIAm123', 'password', '1234 East St', 'Dekalb', 'Illinois', '425-954-8245', 10),
('John Doe', 'JohnIsAwesome', 'password', '1234 North St', 'Dekalb', 'Illinois', '156-456-3645', 10);


INSERT INTO quote(quoteID, customerID, employeeID, customerEmail, paymentInfo, price, description) VALUES 
(1, 1, 1, 'Credit Card', 100, 'email@email.com', 'This is a description'),
(2, 2, 2, 'Credit Card', 100, 'email@email.com', 'This is a description'),
(3, 3, 3, 'Credit Card', 100, 'email@email.com', 'This is a description'),
(4, 4, 1, 'Credit Card', 100, 'email@email.com', 'This is a description'),
(5, 5, 2, 'Credit Card', 100, 'email@email.com', 'This is a description');
