const monggose = require('mongoose');
const Schema = monggose.Schema;

const employeeSchema = new Schema({
    firstname: {
        type:  String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    }
});


module.exports = monggose.model('Employee', employeeSchema);