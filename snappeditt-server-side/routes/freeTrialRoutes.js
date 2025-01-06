const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const { submitFreeTrial } = require("../Controller/freeTrialController");

// POST Route to submit the free trial form
router.post("/free-trial", upload.single("files"), submitFreeTrial);

module.exports = router;
