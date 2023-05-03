INSERT INTO employee (name, username, password, address, city, state, contact, commission, isAdmin) VALUES 
('Bob Williams', 'Bob', 'password', '1234 West St', 'Dekalb', 'IL', '123-456-7890', 35, 1),
('Sally Smith', 'Sally', 'password', '1234 East St', 'Dekalb', 'IL', '256-726-7361', 40, 1);


INSERT INTO employee(name, username, password, address, city, state, contact, commission) VALUES
('Bobbie Hill', 'Bobbie', 'password', '800 North street', 'Chicago', 'IL', '779-456-1264', 10),
('Sam Johnson', 'SamIAm123', 'password', '1234 East St', 'Dekalb', 'IL', '425-954-8245', 10),
('John Doe', 'JohnIsAwesome', 'password', '1234 North St', 'Dekalb', 'IL', '156-456-3645', 10);


INSERT INTO quote(quoteID, customerID, employeeID, customerEmail, paymentInfo, price, description, dateCreated) VALUES 
(1, 1, 3, 'quote@email.com', 'Credit Card', 100, 'This is a description', '2023-04-13'),
(2, 2, 4, 'email@email.com', 'Credit Card', 100, 'This is a description','2023-05-02'),
(3, 3, 5, 'email@email.com', 'Credit Card', 100, 'This is a description', '2023-01-10')