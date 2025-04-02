const PersonalInfo = require('../../models/personalInfoModal');

// @desc - post personal info
// @route - POST - /api/personal-info
// @access - public
const postPersonalInfo = async(req, res) => {
    try{
        const obj = {
            personalInfo: req.body
        }

        const newObj = new PersonalInfo(obj);
        const result = await newObj.save();
        return res.status(201).send({result, message: 'Object created successfully'});
    } catch(err) {
        console.log(err);
    }
}

module.exports = postPersonalInfo;