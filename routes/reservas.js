import express from "express";
import fs from "fs";

const name = "Iván";
const router = express.Router();

const filePathReservas = "./Reservas.json";


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

//creamos un end point
router.get("/", (req, res) => {
    const data = readData(filePathReservas);
    res.render("reservas",{data, name})
    //res.json(data.reservas);
});

router.get("/:id", (req, res) => {
    const data = readData(filePathReservas);
    const id = parseInt(req.params.id);
    const reserva = data.Reservas.find((reserva) => reserva.id === id);
    res.render("reservaDetall",{name, reserva})
    //res.json(reserva);
});

//Creem un endpoint del tipus post per afegir una reserva
router.post("/", (req, res) => {
    const data = readData(filePathReservas);
    const body = req.body;
    const newReserva = {
        id: data.reservas.length + 1,
        ...body,
    };
    data.reservas.push(newReserva);
    writeData(filePathRecursos, data);
    res.json(newReserva);
});

// Update
router.put("/:id", (req, res) => {
    const data = readData(filePathReservas);
    const body = req.body;
    const id = parseInt(req.params.id);
    const reservaIndex = data.Reservas.findIndex((reserva) => reserva.id === id);
    data.reservas[reservaIndex] = {
        ...data.reservas[reservaIndex],
        ...body,
    };
    writeData(filePathReservas, data);
    res.json({ message: "Reserva updated successfully" });
});

//Creem un endpoint per eliminar una reserva
router.delete("/:id", (req, res) => {
    const data = readData(filePathReservas);
    const id = parseInt(req.params.id);
    const reservaIndex = data.reservas.findIndex((reserva) => reserva.id === id);
    data.reservas.splice(reservaIndex, 1);
    writeData(filePathReservas, data);
    res.json({ message: "Reserva deleted successfully" });
});

export default router;