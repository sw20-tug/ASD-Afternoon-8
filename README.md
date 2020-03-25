# ASD: Afternoon 8

This is the repository for the team *ASD: Afternoon 8*



We use Spring Boot with Maven and a MYSQL database: 

### Prerequisites:
  Java 1.8/11,
  Spring Boot, 
  Maven,
  MYSQL,
  Angular
  
*Setup for database*:

```
create database ags; -- Creates the new database
create user 'ags'@'localhost'; -- Creates the user
 grant all on ags.* to 'ags'@'localhost'; -- Gives all privileges to the new user on the newly created database
```



*For backend*:
```
Run following command in complete directory:
./mvnw spring-boot:run
```


*For frontend*:
Run following command in angularclient directory: 
```
1. npm install
2. ng serve --open
```

Frontend now runs on port 4200.



