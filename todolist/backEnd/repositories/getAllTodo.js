import pool from "@/database/db";

export const getAllTodo = async() =>{
    const query =`
        SELECT id, title, item, status
        FROM todoList
    `

    const res = await pool.query(query)
    return res.rows
}