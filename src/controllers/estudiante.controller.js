const db = require('../db/database');
const bcrypt = require('bcrypt');

const getEstudiantes = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM estudiante ORDER BY apellidos, nombre ASC');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const getEstudianteById = async (req, res) => {
    try {
        const id_estudiante = req.params.id;
        const response = await db.query('SELECT * FROM estudiante WHERE id_estudiante = $1', [id_estudiante]);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const deleteEstudiante = async (req, res) => {
    try {
        const id_estudiante = req.params.id;
        const response = await db.query('DELETE FROM estudiante WHERE id_estudiante = $1', [id_estudiante]);
        res.status(200).json({
            message: 'Estudiante eliminado exitosamente.'
        });
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const createEstudiante = async (req, res) => {
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
            estatus_boolean,
            id_maestro
        } = req.body;

        const existeCorreo = await validarExisteCorreo(correo);
        if (existeCorreo === true) {
            const contrasenaBcrypt = await encriptarContrasena(contrasena);
            contrasena = contrasenaBcrypt;

            const response = await db.query('INSERT INTO estudiante (nombre, apellidos, correo, contrasena,' +
                'facultad, experiencia_educativa, rol, estatus, estatus_boolean, id_maestro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                [nombre, apellidos, correo, contrasena, facultad,
                    experiencia_educativa, rol, estatus, estatus_boolean, id_maestro
                ]);

            res.status(200).json({
                message: 'Estudiante registrado existosamente',
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
                        estatus_boolean,
                        id_maestro
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

const updateEstudiante = async (req, res) => {
    try {

        const id_estudiante = req.params.id;

        let {
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
        } = req.body;

        const existeCorreo = await validarExisteCorreo(correo);

        if (existeCorreo === true) {
            const contrasenaBcrypt = await encriptarContrasena(contrasena);
            contrasena = contrasenaBcrypt;

            const response = db.query('UPDATE estudiante set nombre = $1, apellidos = $2, correo = $3,' +
                'contrasena = $4, facultad = $5, experiencia_educativa = $6, rol = $7, estatus = $8,' +
                'estatus_boolean = $9, id_maestro = $10 WHERE id_estudiante = $11', [
                    nombre,
                    apellidos,
                    correo,
                    contrasena,
                    facultad,
                    experiencia_educativa,
                    rol,
                    estatus,
                    estatus_boolean,
                    id_maestro,
                    id_estudiante
                ]);

            res.status(200).json({
                message: 'Estudiante actualizado exitosamente',
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
                        estatus_boolean,
                        id_maestro
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

const updateEstatusEstudiante = async (req, res) => {
    try {

        const id_estudiante = req.params.id;

        let {
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
        } = req.body;

        const existeCorreo = await validarExisteCorreo(correo);

        if (existeCorreo === true) {
            const contrasenaBcrypt = await encriptarContrasena(contrasena);
            contrasena = contrasenaBcrypt;

            const response = db.query('UPDATE estudiante set nombre = $1, apellidos = $2, correo = $3,' +
                'contrasena = $4, facultad = $5, experiencia_educativa = $6, rol = $7, estatus = $8,' +
                'estatus_boolean = $9, id_maestro = $10 WHERE id_estudiante = $11', [
                    nombre,
                    apellidos,
                    correo,
                    contrasena,
                    facultad,
                    experiencia_educativa,
                    rol,
                    estatus,
                    estatus_boolean,
                    id_maestro,
                    id_estudiante
                ]);

            res.status(200).json({
                message: 'Estudiante actualizado exitosamente',
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
                        estatus_boolean,
                        id_maestro
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

// Validaciones

const validarExisteCorreo = async correo => {
    try {
        const response = await db.query('SELECT * FROM estudiante WHERE correo = $1', [correo]);
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

const encriptarContrasena = async (contrasena, saltRounds = 10) => {
    try {
        // generar salt 
        const salt = await bcrypt.genSalt(saltRounds);

        // hash contrasena
        return await bcrypt.hash(contrasena, salt);
    } catch (error) {
        return error;
    }
    return null;
}

module.exports = {
    getEstudiantes,
    getEstudianteById,
    createEstudiante,
    updateEstudiante,
    updateEstatusEstudiante,
    deleteEstudiante
}