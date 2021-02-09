const db = require('../db/database');

const getMaestros = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM maestro');
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
            message: error
        });
    }
}

module.exports = {
    getMaestros,
    getMaestroByID
}