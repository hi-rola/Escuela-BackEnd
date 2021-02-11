const db = require('../db/database');
const bcrypt = require('bcrypt');

const getMaestros = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM maestro ORDER BY apellidos, nombre ASC');
        res.status(200).json(response.rows);

    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const getMaestroByID = async (req, res) => {
    try {
        const id_maestro = req.params.id;
        const response = await db.query('SELECT * FROM maestro WHERE id_maestro = $1', [id_maestro]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const deleteMaestro = async (req, res) => {
    try {
        const id_maestro = req.params.id;
        const response = db.query('DELETE FROM maestro where id_maestro = $1', [id_maestro]);
        res.json({
            message: "Maestro eliminado exitosamente."
        });
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const createMaestro = async (req, res) => {
    try {
        let {
            nombre,
            apellidos,
            correo,
            contrasena,
            facultad,
            experiencia_educativa,
            rol,
            estatus,
            estatus_boolean
        } = req.body;

        const existeCorreo = await validarExisteCorreo(correo);
        if (existeCorreo === true) {
            const contrasenaBcrypt = await encriptarContrasena(contrasena);
            contrasena = contrasenaBcrypt;
            const response = await db.query('INSERT INTO maestro (nombre, apellidos, correo, contrasena,' +
                'facultad, experiencia_educativa, rol, estatus, estatus_boolean) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                [nombre, apellidos, correo, contrasena, facultad,
                    experiencia_educativa, rol, estatus, estatus_boolean
                ]);
            res.status(200).json({
                message: 'Maestro registrado existosamente',
                body: {
                    maestro: {
                        nombre,
                        apellidos,
                        correo,
                        contrasena,
                        facultad,
                        experiencia_educativa,
                        rol,
                        estatus,
                        estatus_boolean
                    }
                }
            });
        } else {
            res.status(400).json({
                message: 'Correo existente, ingrese otro por favor.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const updateMaestro = async (req, res) => {
    try {

        const id_maestro = req.params.id;

        let {
            nombre,
            apellidos,
            correo,
            contrasena,
            facultad,
            experiencia_educativa,
            rol,
            estatus,
            estatus_boolean
        } = req.body;

        const existeCorreo = await validarExisteCorreo(correo);

        if (existeCorreo === true) {
            const contrasenaBcrypt = await encriptarContrasena(contrasena);
            contrasena = contrasenaBcrypt;
            const response = db.query('UPDATE maestro set nombre = $1, apellidos = $2, correo = $3,' +
                'contrasena = $4, facultad = $5, experiencia_educativa = $6, rol = $7, estatus = $8,' +
                'estatus_boolean = $9 WHERE id_maestro = $10', [
                    nombre,
                    apellidos,
                    correo,
                    contrasena,
                    facultad,
                    experiencia_educativa,
                    rol,
                    estatus,
                    estatus_boolean,
                    id_maestro
                ]);

            res.status(200).json({
                message: 'Maestro actualizado exitosamente',
                body: {
                    maestro: {
                        nombre,
                        apellidos,
                        correo,
                        contrasena,
                        facultad,
                        experiencia_educativa,
                        rol,
                        estatus,
                        estatus_boolean
                    }
                }
            });
        } else {
            res.status(400).json({
                message: 'Correo existente, ingrese otro por favor.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const updateEstatusMaestro = async (req, res) => {
    try {

        const id_maestro = req.params.id;

        let {
            nombre,
            apellidos,
            correo,
            contrasena,
            facultad,
            experiencia_educativa,
            rol,
            estatus,
            estatus_boolean
        } = req.body;

        const existeCorreo = await validarExisteCorreo(correo);

        if (existeCorreo === true) {
            const contrasenaBcrypt = await encriptarContrasena(contrasena);
            contrasena = contrasenaBcrypt;
            const response = db.query('UPDATE maestro set nombre = $1, apellidos = $2, correo = $3,' +
                'contrasena = $4, facultad = $5, experiencia_educativa = $6, rol = $7, estatus = $8,' +
                'estatus_boolean = $9 WHERE id_maestro = $10', [
                    nombre,
                    apellidos,
                    correo,
                    contrasena,
                    facultad,
                    experiencia_educativa,
                    rol,
                    estatus,
                    estatus_boolean,
                    id_maestro
                ]);

            res.status(200).json({
                message: 'Maestro actualizado exitosamente',
                body: {
                    maestro: {
                        nombre,
                        apellidos,
                        correo,
                        contrasena,
                        facultad,
                        experiencia_educativa,
                        rol,
                        estatus,
                        estatus_boolean
                    }
                }
            });
        } else {
            res.status(400).json({
                message: 'Correo existente, ingrese otro por favor.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

// consultas externas

const getEstudiantesByIdmaestro = async (req, res) => {
    try {
        const id_maestro = req.params.id;
        const response = await db.query('SELECT * FROM estudiante WHERE id_maestro = $1 ORDER BY apellidos, nombre ASC', [id_maestro]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const getTareasByIdmaestro = async (req, res) => {
    try {
        const id_maestro = req.params.id;
        const response = await db.query('SELECT * FROM tarea WHERE id_maestro = $1 ORDER BY fecha_creacion DESC', [id_maestro]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

// Validaciones 
const validarExisteCorreo = async (correo) => {
    try {
        const response = await db.query('SELECT * FROM maestro where correo = $1', [correo]);
        let existe = false;
        if (response.rowCount === 0) {
            existe = true;
        } else {
            existe = false;
        }
        return existe;
    } catch (error) {
        return error;
    }
}

const encriptarContrasena = async (constrasena, saltRounds = 10) => {
    try {
        // generar salt
        const salt = await bcrypt.genSalt(saltRounds);

        // hash constrasena
        return await bcrypt.hash(constrasena, salt);

    } catch (error) {
        return error;
    }
    return null;
}

module.exports = {
    getMaestros,
    getMaestroByID,
    createMaestro,
    deleteMaestro,
    updateMaestro,
    updateEstatusMaestro,
    getEstudiantesByIdmaestro,
    getTareasByIdmaestro
}