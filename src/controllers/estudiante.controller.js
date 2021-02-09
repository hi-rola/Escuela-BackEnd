const db = require('../db/database');

const getEstudiantes = async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM estudiante');
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({
            message: "Problemas al procesar la solicitud. Por favor intentelo más tarde."
        });
    }
}

module.exports = {
    getEstudiantes
}