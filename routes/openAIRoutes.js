const express = require("express");
const { generateImage } = require("../controllers/openAI.controller");
const router = express.Router();

router.post("/generateImage", generateImage);

module.exports = router;
