import pool from "@/database/db";

export const createTodo = async (data) => {
    const { item, status } = data;

    const query = `
        INSERT INTO todoList (item, status)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [
        item,
        Boolean(status)  
    ];

    const res = await pool.query(query, values);
    return res.rows[0];
};