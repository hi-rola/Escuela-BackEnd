const {
    Router
} = require('express');
const router = Router();

const {
    getTareas,
    createTarea,
    updateTarea,
    deleteTarea
} = require('../controllers/tarea.controller');

router.get('/tareas', getTareas);
router.post('/tareas', createTarea);
router.put('/tareas/:id', updateTarea);
router.delete('/tareas/:id', deleteTarea);

module.exports = router;