import pool from "@/database/db";

export const getAllTodo = async() =>{
    const query =`
        SELECT id, title, item, status, created_at, updated_at
        FROM todoList
        ORDER BY status ASC, id ASC;
    `

    const res = await pool.query(query)
    return res.rows
}