import { connection, authenticate } from "./config/database.js";
import { clientesRouter } from "./routes/clientes.js";
import { reservasRouter } from "./routes/reservas.js";
import { quartosRouter } from "./routes/quartos.js";
import express from "express";
import { pagamentosRouter } from "./routes/pagamentos.js";
import cors from "cors"

authenticate(connection).then (() => {

    connection.sync();
});

const app = express();

app.use(express.json());

app.use(cors());

app.use(clientesRouter);
app.use(reservasRouter);
app.use(quartosRouter);
app.use(pagamentosRouter);

app.get("/hello", (req, res) => { 
    res.json("Hello Tourist"); 
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});