const express = require('express');
const postPersonalInfo = require('../controllers/personalInfo/postPersonalInfo');
const getPersonalInfo = require('../controllers/personalInfo/getPersonalInfo');


const router = new express.Router();

router.route("/").post(postPersonalInfo).get(getPersonalInfo)

module.exports = router;