const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    formConfig: {
        type: [],
    }
})

const Config = mongoose.model('Config', configSchema);

module.exports = Config;