const Config = require('../../models/configModel');


// @desc - save the configuration form
// @route - POST - /api/config/
// @access - Public
const postConfig = async(req, res) => {
    try{
        let obj = {
            name: 'Personal Info',
            formConfig: req.body
        }

        let configObj = new Config(obj);
        let result = await configObj.save();
        return res.status(201).send({result, message: "Config form created successfully."})
    } catch(err) {
        console.log(err);
    }
}

module.exports = postConfig