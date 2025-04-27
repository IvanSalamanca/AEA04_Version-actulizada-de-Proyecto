import express from "express";
import fs from "fs";

const name = "Iván";
const router = express.Router();

const filePathUsuarios = "./Usuarios.json";

// Leer datos del archivo
const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
        return { usuarios: [] }; // valor por defecto si el archivo está vacío o da error
    }
};

// Escribir datos en el archivo
const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error);
    }
};

// Listar todos los usuarios
router.get("/", (req, res) => {
    const data = readData(filePathUsuarios);
    res.render("usuarios", { data, name });
    // res.json(data.usuarios);
});

// Mostrar detalle de un usuario por ID
router.get("/:id", (req, res) => {
    const data = readData(filePathUsuarios);
    const id = parseInt(req.params.id);
    const usuario = data.usuarios.find((usuario) => usuario.id === id);
    res.render("usuarioDetall", { name, usuario });
    // res.json(usuario);
});

router.get("/editar/:id", (req, res) => {
    const data = readData(filePathUsuarios);
    const id = parseInt(req.params.id);
    const usuario = data.usuarios.find((usuario) => usuario.id === id);
    res.render("usuarioEdit", { name, usuario });
    // res.json(usuario);
});

// Crear nuevo usuario
router.post("/", (req, res) => {
    const data = readData(filePathUsuarios);
    const body = req.body;
    const newUsuario = {
        id: data.usuarios.length + 1,
        ...body,
    };
    data.usuarios.push(newUsuario);
    writeData(filePathUsuarios, data);
    res.json(newUsuario);
});

// Actualizar usuario
router.put("/:id", (req, res) => {
    const data = readData(filePathUsuarios);
    const body = req.body;
    const id = parseInt(req.params.id);
    const usuarioIndex = data.usuarios.findIndex((usuario) => usuario.id === id);

    if (usuarioIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    data.usuarios[usuarioIndex] = {
        ...data.usuarios[usuarioIndex],
        ...body,
    };
    writeData(filePathUsuarios, data);
    res.json({ message: "Usuario actualizado correctamente" });
});

// Eliminar usuario
router.delete("/:id", (req, res) => {
    const data = readData(filePathUsuarios);
    const id = parseInt(req.params.id);
    const usuarioIndex = data.usuarios.findIndex((usuario) => usuario.id === id);

    if (usuarioIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    data.usuarios.splice(usuarioIndex, 1);
    writeData(filePathUsuarios, data);
    res.json({ message: "Usuario eliminado correctamente" });
});

export default router;