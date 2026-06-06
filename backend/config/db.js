//Postgresql Database connection:-
import pg from "pg";

const {Pool} = pg;

let pool;

export const connectDB = async() => {
    try {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
       await pool.connect();
        console.log("PostgreSQL Connected Successfully!")
       
    } catch (error) {
        console.log("Connection Failed");
    }
}
export {pool};
export default connectDB;