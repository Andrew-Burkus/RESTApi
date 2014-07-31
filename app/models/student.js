var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
	name: String,
	id: String,
	record: Number
});

module.exports = mongoose.model('Student', studentSchema);