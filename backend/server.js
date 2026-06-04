import express from "express";
import connectDB  from "./config/db.js";
import authroutes from "./routes/authroutes.js";
import profileroutes from "./routes/profileroutes.js";
import blogroutes from "./routes/blogroutes.js"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express()
const port = 3000

connectDB();
app.use(express.json());

//cors enable:-
app.use(cors({origin: "*"}));

app.get('/', (req, res) => {
  res.send('Hello Backend is Running!');
})

//Router url:-
app.use("/api", authroutes);          //authentication routes
app.use("/api", profileroutes);       //Profile routes
app.use("/api", blogroutes);         //Blog routes


app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`)
})