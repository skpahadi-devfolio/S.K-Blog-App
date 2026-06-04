//Postgresql Database connection:-

import pg from "pg";

const {Pool} = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "sk_blog",
    password: "sachinsk",
    port: 5432,
});

export const connectDB = async() => {
    try {
        await pool.connect();
        console.log("PostgreSQL Connected Successfully!")
    } catch (error) {
        console.log("Connection Failed");
    }
}
export {pool};
export default connectDB;