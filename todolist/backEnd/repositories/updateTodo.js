import pool from "@/database/db";

export const updateTodo = async(data) =>{
    const {id, item} = data
    console.log("ID: ", id)
    console.log("INPUT: ", item)
    const query =`
            UPDATE todoList
            SET item = $2
            WHERE id = $1
             RETURNING *;
        `
    const values = [id, item]

    const res = await pool.query(query, values)
    console.log("PATCH RESULT: ", res.rows[0])
    return res.rows[0]


}