const mongoose = require('mongoose');

const sectionFields = {
    type: [{
        id: {type: mongoose.Schema.Types.ObjectId},
        index: {type: Number},
        fieldName: {type: String},
        fieldType: {type: String},
        required: {type: String},
        authentication: {type: String},
        dropdownValues: {type: []}
    }]
}

const configSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    formConfig: {
        type: [{
            sectionNo: {type: Number},
            sectionName: {type: String},
            sectionFields: sectionFields
        }],
    }
})

const Config = mongoose.model('Config', configSchema);

module.exports = Config;