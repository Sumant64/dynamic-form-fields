const express = require('express');
const postConfig = require('../controllers/config/postConfig');
const getConfig = require('../controllers/config/getConfig');


const router = new express.Router();

router.route("/").post(postConfig).get(getConfig);

module.exports = router;