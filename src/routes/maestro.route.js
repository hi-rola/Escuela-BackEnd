const {
    Router
} = require('express');

const router = Router();

const {
    getMaestros, getMaestroByID
} = require('../controllers/Maestro.controller');

router.get('/maestros', getMaestros);
router.get('/maestros/:id', getMaestroByID);

module.exports = router;