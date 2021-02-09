const { Router } = require('express');
const router = Router();

const { getEstudiantes } = require('../controllers/estudiante.controller');

router.get('/estudiantes', getEstudiantes);

module.exports = router;