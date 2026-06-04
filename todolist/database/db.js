import { pool } from "qp"

const pool = new Pool ({
    connectionString: process.env.DATA_URL,
    ssl: {
        rejectUnauthorized: false,
    },

})

export default pool