const express = require('express');
const postPersonalInfo = require('../controllers/personalInfo/postPersonalInfo');


const router = new express.Router();

router.route("/").post(postPersonalInfo)

module.exports = router;