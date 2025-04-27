// ----------------- RECURSOS -----------------
import express from "express";
import fs from "fs";

const name = "Iván";
const router = express();

import bodyParser from "body-parser";

router.use(bodyParser.json());
router.set("view engine", "ejs");
router.set("views", "./views");

const filePathRecursos = "./Recurso.json";

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
    const data = readData(filePathRecursos);
    res.render("recursos",{data, name })
    //res.json(data.recursos);
});


router.get("/:id", (req, res) => {
    const data = readData(filePathRecursos);
    const id = parseInt(req.params.id);
    const recurso = data.recursos.find((recurso) => recurso.idRecursos == id);
    res.render("recursosDetall",{name,recurso })
    //recursosDetall
});

//Creem un endpoint del tipus post per afegir un recurs
router.post("/", (req, res) => {
    const data = readData(filePathRecursos);
    const body = req.body;
    const newRecurso = {
        id: data.recursos.length + 1,
        ...body,
    };
    data.recursos.push(newRecurso);
    writeData(filePathRecursos, data);
    //res.json(newRecurso);
});

router.put("/:id", (req, res) => {
    const data = readData(filePathRecursos);
    const body = req.body;
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.id === id);
    data.recursos[recursoIndex] = {
        ...data.recursos[recursoIndex],
        ...body,
    };
    writeData(filePathRecursos, data);
    res.json({ message: "Recurso updated successfully" });
});

//Creem un endpoint per eliminar un recurs
router.delete("/:id", (req, res) => {
    const data = readData(filePathRecursos);
    const id = parseInt(req.params.id);
    const recursoIndex = data.recursos.findIndex((recurso) => recurso.id === id);
    data.recursos.splice(recursoIndex, 1);
    writeData(filePathRecursos, data);
    res.json({ message: "Recurso deleted successfully" });
});

export default router;