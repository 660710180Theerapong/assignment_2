import pool from "@/database/db";

export const updateTodo = async(data) =>{
    const {id, title, item} = data
    const query =`
            UPDATE todoList
            SET title = $2, item = $3
            WHERE id = $1
            RETURNING *;
        `
    const values = [id, title, item]

    const res = await pool.query(query, values)
    console.log("PATCH RESULT: ", res.rows[0])
    return res.rows[0]


}