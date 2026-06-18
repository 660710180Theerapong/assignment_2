import pool from "@/database/db";

export const createTodo = async (data) => {
    const { title, item, status } = data;
 
    const query = `
        INSERT INTO todoList (title, item, status)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const values = [
        title,
        item,
        Boolean(status)  
    ];
    const res = await pool.query(query, values);
    return res.rows[0];
};