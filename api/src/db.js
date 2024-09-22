require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

//* postgres://USER:PASSWORD@HOST:PORT/DATABASE
const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/pokemon`,
	{ logging: false }
);

// Traemos los modelos de la carpeta Models
const PokemonModel = require("./models/Pokemon.js");
const TypeModel = require("./models/Type.js");

// Injectamos la conexion (sequelize) a todos los modelos
PokemonModel(sequelize);
TypeModel(sequelize);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Type } = sequelize.models;
//console.log(sequelize.models)

// Aca vendrian las relaciones
Pokemon.belongsToMany(Type, { through: "pokemons_x_types" });
Type.belongsToMany(Pokemon, { through: "pokemons_x_types" });

module.exports = {
	...sequelize.models,
	sqlz: sequelize
};
