make sure background db service is up and running

mysql -u root -p

show databases;

create database user_restapi;

MariaDB [(none)]> use user_restapi

Database changed
MariaDB [user_restapi]> CREATE TABLE app_user(
    -> id INT PRIMARY KEY AUTO_INCREMENT,
    -> name VARCHAR(255) NOT NULL,
    -> email VARCHAR(255) NOT NULL
    -> );
Query OK, 0 rows affected (0.040 sec)

MariaDB [user_restapi]>