
CREATE TABLE employee (
  employeeID INTEGER PRIMARY KEY AUTOINCREMENT,
  username INTEGER NOT NULL,
  password VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(50),
  city VARCHAR(50),
  state VARCHAR(2),
  contact VARCHAR(50),
  commission INTEGER DEFAULT(0),
  isAdmin INTEGER DEFAULT(0)
);

CREATE TABLE quote (
  quoteID INTEGER PRIMARY KEY AUTOINCREMENT,
  customerID INTEGER NOT NULL DEFAULT 0,
  employeeID INTEGER NOT NULL,
  customerEmail VARCHAR(50) NOT NULL,
  paymentInfo VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  description VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT('unresolved') NOT NULL,
  FOREIGN KEY (employeeID) REFERENCES employee(employeeID)
);

CREATE Table purchased (
  purchasedID INTEGER PRIMARY KEY AUTOINCREMENT,
  customerID INTEGER NOT NULL,
  quoteID INTEGER NOT NULL,
  customerEmail VARCHAR(50) NOT NULL,
  paymentInfo VARCHAR(50) NOT NULL,
  price INTEGER NOT NULL,
  description VARCHAR(50) NOT NULL,
  FOREIGN KEY (customerID) REFERENCES quote(customerID),
  FOREIGN KEY (quoteID) REFERENCES quote(quoteID)
);