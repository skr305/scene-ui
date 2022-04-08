
drop database if exists `2022student`;
create database `2022student`;
use `2022student`;
    
create table `Student` (
     
    usernick varchar(300) not null ,
      
    pwd varchar(300) not null ,
      
    userID varchar(300) not null ,
     
    primary key ( userID  ) 
    
);
        
create table `User` (
     
    userID varchar(300) not null ,
      
    pwd varchar(300) not null ,
      
    usernick varchar(300) not null ,
     
    primary key ( userID  ) 
    
);
        