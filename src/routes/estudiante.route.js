const {
    Router
} = require('express');
const router = Router();

const {
    getEstudiantes,
    getEstudianteById,
    createEstudiante,
    updateEstudiante,
    updateEstatusEstudiante,
    deleteEstudiante
} = require('../controllers/estudiante.controller');

router.get('/estudiantes', getEstudiantes);
router.get('/estudiantes/:id', getEstudianteById);
router.post('/estudiantes', createEstudiante);
router.put('/estudiantes/:id', updateEstudiante);
router.put('/estudiantes/:id', updateEstatusEstudiante);
router.delete('/estudiantes/:id', deleteEstudiante);

module.exports = router;