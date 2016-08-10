"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = new Schema({
	user:{
		email:String,
		name:String,
		password:String
	},
	vot:Array,
	__v:Number
	},
	{ versionKey: false });
module.exports=mongoose.model("User",User);