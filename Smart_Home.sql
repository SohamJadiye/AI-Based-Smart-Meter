drop database smart_home;
Create Database Smart_Home;

Create Table smart_home.Users (
UserId  int auto_increment primary key,
Email_Id varchar(50),
FirstName varchar(50),
LastName varchar(50),
Login_Password varchar(50),
Phone_Number varchar(50) 
);


Select * from Users;
Select userid from users where phone_number = '9137985657';

Create Table smart_home.Information (
Fk_userid int,
Temperature smallint,
Current smallint,
Voltage smallint,
Humidity smallint,
Timestamp int,

Foreign Key(Fk_userid) references users(userid)
);


select * from Information;

Select * from Users;

