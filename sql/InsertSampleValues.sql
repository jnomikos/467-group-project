INSERT INTO admin (adminID, name, password, address, city, state, contact) VALUES 
(1, 'Bob', 'password', '1234 West St', 'Dekalb', 'Illinois', '123-456-7890'),
(2, 'Sally', 'password', '1234 East St', 'Dekalb', 'Illinois', '256-726-7361');


INSERT INTO employee(employeeID, name, password, address, city, state, contact, commission) VALUES
(1, 'Bobbie', 'password', '800 North street', 'Chicago', 'Illinois', '779-456-1264', 10),
(2, 'Sally', 'password', '1234 East St', 'Dekalb', 'Illinois', '425-954-8245', 10),
(3, 'John', 'password', '1234 North St', 'Dekalb', 'Illinois', '156-456-3645', 10);



INSERT INTO quote(quoteID, customerID, employeeID, paymentInfo, price, description) VALUES 
(1, 1, 1, 'Credit Card', 100, 'This is a description'),
(2, 2, 2, 'Credit Card', 100, 'This is a description'),
(3, 3, 3, 'Credit Card', 100, 'This is a description'),
(4, 4, 1, 'Credit Card', 100, 'This is a description'),
(5, 5, 2, 'Credit Card', 100, 'This is a description');
