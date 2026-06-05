import { pool } from "../database/db";

export const updateTodo = async(data) =>{
    const {id, status} = data

    const query =`
            UPDATE todoList
            SET status = $2
            WHERE id = $1
             RETURNING *;
        `
    const values = [id, status]

    const res = await pool.query(query, values)
    return res.rows[0]

}