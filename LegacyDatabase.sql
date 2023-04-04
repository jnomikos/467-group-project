 use csci467;

 create table admin (
    -- make int id the primary key and auto increment
    adminID int not null auto_increment primary key,
    name varchar(50) not null,
      address varchar(50) not null,
      city varchar(50) not null,
      street varchar(50) not null,
      contact varchar(50) not null
 );

 create table Employee (
    -- make int id the primary key and auto increment
    employeeID int not null auto_increment primary key,
    name varchar(50) not null,
      address varchar(50) not null,
      city varchar(50) not null,
      street varchar(50) not null,
      contact varchar(50) not null,
      commission int not null
 );

 create table quote (
      -- make int id the primary key and auto increment
      quoteID int not null auto_increment primary key,
      customerID int not null,
      employeeID int not null,
      paymentInfo varchar(50) not null,
      price int not null,
      description varchar(50) not null,
      foreign key (customerID) references customers(customerID),
      foreign key (employeeID) references Employee(employeeID)
   );