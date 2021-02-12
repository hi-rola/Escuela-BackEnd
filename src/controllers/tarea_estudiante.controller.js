const db = require('../db/database');

const entregarTareaEstudiante = async (req, res) => {
    try {
        const {
            id_estudiante,
            id_tarea,
            mensaje,
            fecha_entrega,
            estatus_entrega
        } = req.body;

        const reponse = await db.query('INSERT INTO tarea_estudiante (id_estudiante, id_tarea, mensaje, fecha_entrega, estatus_entrega)' +
            'VALUES ($1, $2, $3, $4, $5)', [
                id_estudiante,
                id_tarea,
                mensaje,
                fecha_entrega,
                estatus_entrega
            ]);

        res.status(200).json({
            message: 'Tarea entregada exitosamente',
            body: {
                tarea_estudiante: {
                    id_estudiante,
                    id_tarea,
                    mensaje,
                    fecha_entrega,
                    estatus_entrega
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

const getTareasEstudianteByIdtarea = async (req, res) => {
    try {
        const id_tarea = req.params.id;

        const response = await db.query('SELECT e.nombre, e.apellidos, t.nombre, te.mensaje, ' +
            'te.fecha_entrega , te.estatus_entrega ' +
            'FROM estudiante e, tarea_estudiante te, tarea t ' +
            'WHERE e.id_estudiante = te.id_estudiante AND t.id_tarea = te.id_tarea ' +
            'AND t.id_tarea = $1', [id_tarea]);

        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    entregarTareaEstudiante,
    getTareasEstudianteByIdtarea
}