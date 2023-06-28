const express = require("express");
const app = express();
const mariadb = require("mariadb");
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5,
});


app.post("/data", async (req, res) => {
  const { name, email } = req.body;

  try {
    const conn = await pool.getConnection();

    await conn.query("INSERT INTO app_user (name, email) VALUES (?, ?)", [
      name,
      email,
    ]);

    conn.release();

    res.status(201).json({ message: "Record created successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read all records
app.get("/data", async (req, res) => {
  try {
    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Execute the query to fetch all records
    const rows = await conn.query("SELECT * FROM app_user");

    // Release the connection
    conn.release();

    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a record
app.put("/data/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  try {
    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Execute the query to update the record
    await conn.query("UPDATE app_user SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      id,
    ]);

    // Release the connection
    conn.release();

    res.json({ message: "Record updated successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a record
app.delete("/data/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Get a connection from the pool
    const conn = await pool.getConnection();

    // Execute the query to delete the record
    await conn.query("DELETE FROM app_user WHERE id = ?", [id]);

    // Release the connection
    conn.release();

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running...");
});