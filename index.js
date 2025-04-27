const filePathRecursos = "./Recurso.json";
const filePathNotificaciones = "./Notificacion.json";
const filePathReservas = "./Reservas.json";

import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

import notificacionRouter from "./routes/notificaciones.js";
import recursosRouter from "./routes/recursos.js";
import reservasRouter from "./routes/reservas.js";
import userRouter from "./routes/usuarios.js";


const name = "Iván";

const app = express();
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "./views");

const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/recursos", recursosRouter)
app.use("/notifications", notificacionRouter)
app.use("/reservas", reservasRouter) 
app.use("/usuarios", userRouter)
 
//Funció per escoltar
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});