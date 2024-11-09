require("dotenv").config();
const { connect, Schema, models, model } = require("mongoose");

if (!process.env.MONGODB_URL_LOCAL) {
	throw new Error("MONGODB_URL must be define.");
}

const connectDB = async () => {
	try {
		await connect(process.env.MONGODB_URL_LOCAL);
		console.log("Connection established with the database!");
	} catch (error) {
		console.log("Error connecting to database", error);
	}
};

// importo modelos
const pokemonSchema = require("./newModels/Pokemon.js");
const typeSchema = require("./newModels/Type.js");

// creo las relaciones o referencias
pokemonSchema.add({
	types: [{ type: Schema.Types.ObjectId, ref: "Type" }]
});
typeSchema.add({
	pokemons: [{ type: Schema.Types.ObjectId, ref: "Pokemon" }]
});

// creando los modelos y trayendo el esquema de la colección si ya integrado
const Pokemon = models.Pokemon || model("Pokemon", pokemonSchema);
const Type = models.Type || model("Type", typeSchema);

module.exports = {
	Pokemon,
	Type,
	connectDB
};
