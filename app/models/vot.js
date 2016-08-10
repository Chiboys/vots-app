'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vot = new Schema({
			name:String,
			result:[Number],
			choose:[String]	
	},
	{ versionKey: false });
module.exports = mongoose.model('Vot',Vot);