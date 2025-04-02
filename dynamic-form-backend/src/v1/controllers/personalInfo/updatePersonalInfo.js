const PersonalInfo = require('../../models/personalInfoModal');

// @desc - update personal info
// @route - POST - /api/personal-info/:id
// @access - public
const updatePersonalInfo = async(req, res) => {
    try{
        let id = req.params['id'];
        let updates = Object.keys(req.body);
        let dataObj = await PersonalInfo.findById(id);
        if(!dataObj) {
            return res.status(300).send({message: 'No data found'})
        }

        let obj = new PersonalInfo(dataObj);

        updates.forEach((update) => obj.personalInfo[update] = req.body[update])

        let result = await obj.save();

        return res.status(200).send({result, message: 'Document updated successfully'})
    } catch(err) {
        console.log(err);
        return res.status(300).send({err})
    }
}

module.exports = updatePersonalInfo;