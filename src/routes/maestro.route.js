const {
    Router
} = require('express');

const router = Router();

const {
    getMaestros,
    getMaestroByID,
    createMaestro,
    deleteMaestro,
    updateMaestro,
    updateEstatusMaestro,
    getEstudiantesByIdmaestro,
    getTareasByIdmaestro
} = require('../controllers/Maestro.controller');

router.get('/maestros', getMaestros);
router.get('/maestros/:id', getMaestroByID);
router.delete('/maestros/:id', deleteMaestro);
router.post('/maestros', createMaestro);
router.put('/maestros/:id', updateMaestro);
router.put('/maestros/:id', updateEstatusMaestro);

router.get('/maestros/estudiantes/:id', getEstudiantesByIdmaestro);
router.get('/maestros/tareas/:id', getTareasByIdmaestro);

module.exports = router;