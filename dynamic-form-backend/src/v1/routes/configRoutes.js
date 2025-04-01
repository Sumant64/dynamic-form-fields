const express = require('express');
const postConfig = require('../controllers/config/postConfig');


const router = new express.Router();

router.route("/").post(postConfig)

module.exports = router;