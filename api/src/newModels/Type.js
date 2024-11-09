const { Schema } = require("mongoose");

const typeSchema = new Schema(
	{
		nombre: {
			type: String,
			required: true
		}
	},
	{ timestamps: false }
);

module.exports = typeSchema;
