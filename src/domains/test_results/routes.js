// routes/testResults.js
const express = require('express');
const router = express.Router();
const { handleTestResults } = require("./controller");

router.post('/test-results', handleTestResults);

module.exports = router;
