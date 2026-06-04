import { pool } from "../database/db";

export const create = async(data) =>{
    const {item, status} = data

    const query = `
        INSERT INTO todoList
        VALUES( $1, $2)
        RETURN*;
    `
    const values =[
        item,
        status
    ];

    const res = await pool.query(query, values)
    return res.rows[0]
}