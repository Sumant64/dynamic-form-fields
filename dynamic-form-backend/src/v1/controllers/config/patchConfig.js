const Config = require('../../models/configModel');

// @desc - patch config form
// @route - PATCH - /api/config/patchconfig/:id
// @access - Public
const patchConfig = async(req, res) => {
    try{
        let id = req.params.id;
        const payload = req.body;

        let configForm = await Config.findOne({_id: id});

        if(!configForm) {
            return res.status(404).send({message: "Config form not found."})
        }

        let obj = new Config(configForm);
        obj.formConfig = payload;

        let result = obj.save();
        res.status(201).send({message: 'Config form updated successfully.', result});

    } catch(err) {
        console.log(err);
        res.status(400).send({message: 'Something went wrong.', err})
    }
}

module.exports = patchConfig;