const express = require('express');
const postConfig = require('../controllers/config/postConfig');
const getConfig = require('../controllers/config/getConfig');
const patchConfig = require('../controllers/config/patchConfig');


const router = new express.Router();

router.route("/").post(postConfig).get(getConfig);
router.patch("/patchconfig/:id", patchConfig);

module.exports = router;