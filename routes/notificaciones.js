// ----------------- NOTIFICACIONES -----------------

import express from "express";
import fs from "fs";

const name = "Iván";
const router = express();

import bodyParser from "body-parser";

router.use(bodyParser.json());
router.set("view engine", "ejs");
router.set("views", "./views");

const filePathNotificaciones = "./Notificacion.json";

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
    const data = readData(filePathNotificaciones);
    res.render("notifications",{data, name})
    //res.json(data.notifications);
});

// Vista detallada de la notificació
router.get("/:id", (req, res) => {
    const data = readData(filePathNotificaciones);
    const id = parseInt(req.params.id);
    const notificationes = data.notificacion.find((notification) => notification.id === id);
    res.render("notificationsDetall",{name,notificationes})
});

// Endpoint para editar la notificació
router.get("/editar/:id", (req, res) => {
    const data = readData(filePathNotificaciones);
    const id = parseInt(req.params.id);
    const notificationes = data.notificacion.find((notification) => notification.id === id);
    res.render("notificationsEdit",{name,notificationes})
});

//Creem un endpoint del tipus post per afegir una notificació
router.post("/", (req, res) => {
    const data = readData(filePathNotificaciones);
    const body = req.body;
    const newNotification = {
        id: data.notifications.length + 1,
        ...body,
    };
    data.notifications.push(newNotification);
    writeData(filePathNotificaciones, data);
    res.json(newNotification);
});

// Update
router.put("/:id", (req, res) => {
    const data = readData(filePathNotificaciones);
    const body = req.body;
    const id = parseInt(req.params.id);
    const notificationIndex = data.notifications.findIndex((notification) => notification.id === id);
    data.notifications[notificationIndex] = {
        ...data.notifications[notificationIndex],
        ...body,
    };
    writeData(filePathNotificaciones, data);
    res.json({ message: "Notification updated successfully" });
});

//Creem un endpoint per eliminar una notificació
router.delete("/:id", (req, res) => {
    const data = readData(filePathNotificaciones);
    const id = parseInt(req.params.id);
    const notificationIndex = data.notifications.findIndex((notification) => notification.id === id);
    data.notifications.splice(notificationIndex, 1);
    writeData(filePathNotificaciones, data);
    res.json({ message: "Notification deleted successfully" });
});

export default router;

