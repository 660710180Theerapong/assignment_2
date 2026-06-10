import pool from "@/database/db";

export const getTodo = async(data) =>{
    const {id} = data
    const query =`
            SELECT id, title, item, status
            FROM todoList
            WHERE id = $1
        `
    const values = [id]

    const res = await pool.query(query, values)
    // console.log("GET RESULT: ", res.rows[0])
    return res.rows[0]


}