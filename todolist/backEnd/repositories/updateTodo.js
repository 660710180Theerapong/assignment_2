import { pool } from "../database/db";

export const updateTodo = async(data) =>{
    const {id, item} = data

    const query =`
            UPDATE todoList
            SET item = $2
            WHERE id = $1
             RETURNING *;
        `
    const values = [id, item]

    const res = await pool.query(query, values)
    return res.rows[0]

}