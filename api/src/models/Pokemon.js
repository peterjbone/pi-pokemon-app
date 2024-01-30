const { DataTypes } = require("sequelize")

function Pokemon(sequelize) {
	sequelize.define(
		"Pokemon",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			nombre: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			imagen: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					isUrl: true
				}
			},
			vida: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			ataque: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			defensa: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			velocidad: {
				type: DataTypes.INTEGER,
				allowNull: true
			},
			altura: {
				type: DataTypes.DOUBLE,
				allowNull: true
			},
			peso: {
				type: DataTypes.DOUBLE,
				allowNull: true
			}
		},
		{ timestamps: false }
	)
}

module.exports = Pokemon
