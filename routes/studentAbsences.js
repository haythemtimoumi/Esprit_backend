// routes/studentAbsences.js
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../config/dbConfig'); // Adjust the path as needed

// Route to get all absences for a student by ID
router.get('/:id', async (req, res) => {
  let connection;
  try {
    const studentId = req.params.id;

    connection = await connectToDatabase();
    const result = await connection.execute(
      `SELECT 
          e.NOM_ET, 
          e.PNOM_ET, 
          ens.NOM_ENS, 
          ens.IMAGE, 
          ens.PRENOM_ENS,
          a.CODE_MODULE, 
          a.DATE_SEANCE, 
          a.JUSTIFICATION, 
          a.LIB_JUSTIF
      FROM 
          bd_local.esp_absence_new a
      JOIN 
          bd_local.esp_etudiant e ON e.ID_ET = a.ID_ET
      JOIN 
          bd_local.esp_enseignant ens ON ens.ID_ENS = a.ID_ENS
      JOIN 
          bd_local.ESP_INSCRIPTION ins ON ins.ID_ET = e.ID_ET 
      WHERE 
          a.ID_ET = :id_et
          AND a.CODE_CL = ins.CODE_CL`,
      { id_et: studentId }
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No absences found for this student' });
    } else {
      res.json(result.rows);
    }
  } catch (error) {
    console.error('Error fetching absences for student:', error.message);
    res.status(500).json({ error: 'Failed to fetch absences', message: error.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error('Error closing database connection:', error.message);
      }
    }
  }
});

module.exports = router;
