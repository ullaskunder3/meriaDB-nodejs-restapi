# User REST API

This API allows you to perform CRUD operations (Create, Read, Update, Delete) on user records stored in a MariaDB database.

## Base URL

```
http://localhost:3000
```

## Resources

### User

Represents a user record in the database.

#### Attributes

- `id` (integer): The unique identifier of the user.
- `name` (string): The name of the user.
- `email` (string): The email address of the user.

### Endpoints

#### Create a User

Create a new user record.

- URL: `/data`
- Method: `POST`
- Request Body:

  ```json
  {
    "name": "ullas kunder",
    "email": "ullaskunder3@gmail.com"
  }
  ```

- Response:
  - Status: `201 Created`
  - Body:
    ```json
    {
      "message": "Record created successfully"
    }
    ```

#### Get All Users

Retrieve all user records.

- URL: `/data`
- Method: `GET`
- Response:
  - Status: `200 OK`
  - Body:
    ```json
    [
      {
        "id": 1,
        "name": "Monkey D luffy",
        "email": "luffy@emperor.com"
      },
      {
        "id": 2,
        "name": "ullas kunder",
        "email": "ullaskunder3@gmail.com"
      },
      ...
    ]
    ```

#### Update a User

Update an existing user record.

- URL: `/data/:id`
- Method: `PUT`
- Request Body:

  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com"
  }
  ```

- Response:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "message": "Record updated successfully"
    }
    ```

#### Delete a User

Delete an existing user record.

- URL: `/data/:id`
- Method: `DELETE`
- Response:
  - Status: `200 OK`
  - Body:
    ```json
    {
      "message": "Record deleted successfully"
    }
    ```

> Make sure rename .env-local to .env and replace current info with your db credientials

> If you are using Thunder Client, you can find the API collection provided in the project files.

make sure background db service is up and running

```
mysql -u root -p
```

Once you are logged in to the MariaDB server, execute the following command to display the list of existing databases:

```
show databases;
```

Create a new database named `user_restapi` by executing the following command:

```
create database user_restapi;
```

After creating the database, switch to the newly created database using the following command:

```
MariaDB [(none)]> use user_restapi
```

Creating the app_user Table

```
Database changed
MariaDB [user_restapi]> CREATE TABLE app_user(
-> id INT PRIMARY KEY AUTO_INCREMENT,
-> name VARCHAR(255) NOT NULL,
-> email VARCHAR(255) NOT NULL
-> );
Query OK, 0 rows affected (0.040 sec)

MariaDB [user_restapi]>
```

```
CREATE TABLE app_user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

```