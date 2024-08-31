
//app.js 
const express = require('express');
const cors = require('cors');
const app = express();

// CORS middleware should be applied before route definitions
app.use(cors()); // Enable CORS
app.use(express.json());



const notesBelowThresholdRoutes = require('./routes/notesBelowThreshold');
const societeByStudentRoutes = require('./routes/societeByStudent');
const studentModulesStRoutes = require('./routes/studentModulesSt');
const studentRoutes = require('./routes/studentRoutes');
const studentByIdRoutes = require('./routes/studentById');
const enseignantByIdRoutes = require('./routes/enseignantById');
const allEnseignantRoutes = require('./routes/allEnseignant');
const absenceByIdRoutes = require('./routes/absenceById');
const enseignantA = require('./routes/enseignantActive');
const studentModulesRoutes = require('./routes/studentModules');
const studentModulesRRoutes = require('./routes/studentModulesR');
const loginRoutes = require('./routes/login'); // Import the login route

const studentAbsencesRoutes = require('./routes/studentAbsences'); // Import the student absences route
const studentStudyHoursRoutes = require('./routes/studentStudyHours');
const emploiRoutes = require('./routes/emploiRoutes');
const studentMsgRoutes = require('./routes/studentMsg');
const studentStatsRoutes = require('./routes/studentStats'); 

const studentNotesByID = require('./routes/studentNotesById'); 




// Route definitions should come after CORS is set up
app.use('/studentAbsences', studentAbsencesRoutes); // Mount the student absences route
app.use('/studentStudyHours', studentStudyHoursRoutes);
app.use('/students', studentRoutes);
app.use('/studentById', studentByIdRoutes);
app.use('/enseignantById', enseignantByIdRoutes);
app.use('/allenseignant', allEnseignantRoutes);
app.use('/absenceById', absenceByIdRoutes);
app.use('/enseignantActive', enseignantA);
app.use('/studentModules', studentModulesRoutes);
app.use('/studentModulesR', studentModulesRRoutes);
app.use('/login', loginRoutes);  
app.use('/studentModulesSt', studentModulesStRoutes);
app.use('/societeByStudent', societeByStudentRoutes);
app.use('/emploi', emploiRoutes);
app.use('/studentStats', studentStatsRoutes);
app.use('/studentNotesById', studentNotesByID);



app.use('/notesBelowThreshold', notesBelowThresholdRoutes);
app.use('/studentMsg', studentMsgRoutes); 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
