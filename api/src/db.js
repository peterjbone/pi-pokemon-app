require("dotenv").config()
const { Sequelize } = require("sequelize")
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/pokemon`,
	{ logging: false }
)

// Traemos los modelos de la carpeta Models

// Injectamos la conexion (sequelize) a todos los modelos

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
//? const { Pokemon } = sequelize

// Aca vendrian las relaciones
//? Product.hasMany(Reviews);

module.exports = {
	...sequelize.models,
	sqlz: sequelize
}
