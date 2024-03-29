import mysql from "mysql2";

import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getTodos() {
  const [rows] = await pool.query("SELECT * FROM todos");
  return rows;
}

export async function getTodo(id) {
  const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
  return rows[0];
}

export async function createTodo(title, lat, lng) {
  const [result] = await pool.query(
    "INSERT INTO todos (title, lat, lng) VALUES (?, ?, ?)",
    [title, lat, lng]
  );
  return getTodo(result.insertId);
}

export async function removeTodo(id) {
  const [result] = await pool.query("DELETE FROM todos WHERE id = ?", [id]);
  return result;
}

export async function updateTodo(id, title, lat, lng) {
  const [result] = await pool.query(
    "UPDATE todos SET title = ?, lat = ?, lng = ? WHERE id = ?",
    [title, lat, lng, id]
  );
  return result;
}
