import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("servidor funcionando")
});


app.listen(serverPort, () => {
    console.log(`servidor rodando em http://localhost:${serverPort}`);
});