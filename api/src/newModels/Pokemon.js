const { Schema } = require("mongoose");

const pokemonSchema = new Schema(
	{
		idApi: {
			type: Number,
			required: true
		},
		nombre: {
			type: String,
			required: true,
			unique: true
		},
		imagen: {
			type: String,
			required: true,
			validate: {
				validator: function (value) {
					return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
				},
				message: "Debe ser una URL válida"
			}
		},
		vida: {
			type: Number,
			required: true
		},
		ataque: {
			type: Number,
			required: true
		},
		defensa: {
			type: Number,
			required: true
		},
		velocidad: {
			type: Number,
			required: false
		},
		altura: {
			type: Number,
			required: false
		},
		peso: {
			type: Number,
			required: false
		}
	},
	{ timestamps: false }
);

module.exports = pokemonSchema;
