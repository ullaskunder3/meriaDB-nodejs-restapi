const express = require("express");
const app = express();
const mariadb = require("mariadb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// example;;;;
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "dxlordullas",
  database: "user_restapi",
  connectionLimit: 5,
});

app.post("/data", async (req, res) => {
    console.log("data---", req.body);
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

app.get("/data", async (req, res) => {
  try {
    const conn = await pool.getConnection();

    const rows = await conn.query("SELECT * FROM app_user");

    conn.release();

    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running...");
});
