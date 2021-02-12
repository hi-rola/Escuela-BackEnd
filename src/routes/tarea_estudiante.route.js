const {
    Router
} = require('express');
const router = require('./estudiante.route');


const {
    entregarTareaEstudiante,
    getTareasEstudianteByIdtarea
} = require('../controllers/tarea_estudiante.controller');

router.post('/tareas-estudiantes', entregarTareaEstudiante);
router.get('/tareas-estudiantes/:id', getTareasEstudianteByIdtarea);

module.exports = router;