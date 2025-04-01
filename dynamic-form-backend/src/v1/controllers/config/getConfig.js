const Config = require('../../models/configModel');

// @desc - get the config form
// @route - GET - /api/config
// @access - public
const getConfig = async(req, res) => {
    try{
        let result = await Config.find({});
        res.status(200).send({result})
    } catch(err) {
        console.log(err);
    }
}

module.exports = getConfig;