const db = require('../db/database');

const getTareas = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM tarea');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const createTarea = async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            fecha_creacion,
            fecha_entrega,
            estatus_expiracion,
            id_maestro
        } = req.body;

        const response = await db.query('INSERT INTO tarea (nombre, descripcion, fecha_creacion, fecha_entrega, ' +
            ' estatus_expiracion, id_maestro) VALUES ($1, $2, $3, $4, $5, $6)', [nombre, descripcion, fecha_creacion, fecha_entrega,
                estatus_expiracion, id_maestro
            ]);

        res.status(200).json({
            message: 'Tarea registrada exitosamente',
            body: {
                tarea: {
                    nombre,
                    descripcion,
                    fecha_creacion,
                    fecha_entrega,
                    estatus_expiracion,
                    id_maestro
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const updateTarea = async (req, res) => {
    try {
        const id_tarea = req.params.id;

        const {
            nombre,
            descripcion,
            fecha_creacion,
            fecha_entrega,
            estatus_expiracion,
            id_maestro
        } = req.body;

        const response = await db.query('UPDATE tarea SET nombre = $1, descripcion = $2, fecha_creacion = $3,' +
            'fecha_entrega = $4, estatus_expiracion = $5, id_maestro = $6 WHERE id_tarea = $7', [
                nombre,
                descripcion,
                fecha_creacion,
                fecha_entrega,
                estatus_expiracion,
                id_maestro,
                id_tarea
            ]);

        res.status(200).json({
            message: 'Tarea actualizada exitosamente',
            body: {
                tarea: {
                    nombre,
                    descripcion,
                    fecha_creacion,
                    fecha_entrega,
                    estatus_expiracion,
                    id_maestro
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const deleteTarea = async (req, res) => {
    try {
        const id_tarea = req.params.id;

        const response = await db.query('DELETE FROM tarea WHERE id_tarea = $1', [id_tarea]);
        res.status(200).json({
            message: 'Tarea eliminada exitosamente'
        });

    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}


module.exports = {
    getTareas,
    createTarea,
    updateTarea,
    deleteTarea
}