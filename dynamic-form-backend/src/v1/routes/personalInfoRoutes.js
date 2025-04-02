const express = require('express');
const postPersonalInfo = require('../controllers/personalInfo/postPersonalInfo');
const getPersonalInfo = require('../controllers/personalInfo/getPersonalInfo');
const updatePersonalInfo = require('../controllers/personalInfo/updatePersonalInfo');


const router = new express.Router();

router.route("/").post(postPersonalInfo).get(getPersonalInfo)

router.route("/:id").patch(updatePersonalInfo);

module.exports = router;