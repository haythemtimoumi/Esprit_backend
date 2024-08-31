//routes/studentModulesSt.js


const express = require('express');
const router = express.Router();
const connectToDatabase = require('../config/dbConfig'); // Adjust the path to your dbConfig file

// Route to get student and module data by ID_ET
router.get('/:id_et', async (req, res) => {
    const idEt = req.params.id_et;

    const query = `
        SELECT 
            e.PNOM_ET,
            e.NOM_ET,
            i.CODE_CL,
            i.ANNEE_DEB,
            m.NB_HEURES,
            m.COEF,
            m.NUM_SEMESTRE,
            m.CODE_MODULE,
            (SELECT COUNT(*) 
             FROM bd_local.ESP_ABSENCE_NEW a 
             WHERE a.ID_ET = e.ID_ET 
               AND a.CODE_CL = i.CODE_CL AND a.CODE_MODULE = m.CODE_MODULE) AS absence_count
        FROM bd_local.ESP_ETUDIANT e
        JOIN bd_local.ESP_INSCRIPTION i ON e.ID_ET = i.ID_ET
        JOIN bd_local.ESP_MODULE_PANIER_CLASSE_SAISO m ON i.CODE_CL = m.CODE_CL
        WHERE e.ID_ET = :id_et
          AND m.ANNEE_DEB = i.ANNEE_DEB
          AND i.CODE_CL = m.CODE_CL
    `;

    let connection;

    try {
        // Establish connection to the database
        connection = await connectToDatabase();

        // Execute the query with the provided ID_ET
        const result = await connection.execute(query, [idEt]);

        // Send the result as JSON
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    } finally {
        // Ensure the connection is closed when done
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Failed to close the connection', err);
            }
        }
    }
});

module.exports = router;
