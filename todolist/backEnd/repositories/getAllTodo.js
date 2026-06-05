import { pool } from "../database/db";

export const getAllTodo = async() =>{
    const query =`
        SELECT id, item, status
        FROM todoList
    `

    const res = await pool.query(query)
    return res.rows
}