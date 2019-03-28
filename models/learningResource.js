var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    fileName: {type: String, required: true},
    filePath: {type: String, required: true},
    title: {type: String, required: true},
    uploader: {type: String, required: true},
    subject: {type: String, required: true},
    date: {type: String, required: true}
});

module.exports = mongoose.model('LearningResources', schema);