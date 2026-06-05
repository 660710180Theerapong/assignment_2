import pool from "@/database/db";

export const deleteTodo = async (data) => {
    const {id} = data
    const query = `
        DELETE FROM todoList
        WHERE id = $1
    `;

    const values = [id]

    const result = await pool.query(query, values);

    return result.rowCount;
};