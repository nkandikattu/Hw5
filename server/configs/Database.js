import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'hw5DB'
}).promise()

export async function getAllUsers() {
    const [rows] = await pool.query("SELECT * FROM User")
    return rows
  }

export async function getUsers(id) {
  const [rows] = await pool.query(`SELECT * FROM User
  where id <> ?`, id)
  return rows
}

// export async function getNote(id) {
//   const [rows] = await pool.query(`
//   SELECT * 
//   FROM notes
//   WHERE id = ?
//   `, [id])
//   return rows[0]
// }

// export async function createNote(title, contents) {
//   const [result] = await pool.query(`
//   INSERT INTO notes (title, contents)
//   VALUES (?, ?)
//   `, [title, contents])
//   const id = result.insertId
//   return getNote(id)
// }