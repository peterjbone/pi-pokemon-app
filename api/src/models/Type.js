const { DataTypes } = require("sequelize")

function Type(sequelize) {
	sequelize.define(
		"Type",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			nombre: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{ timestamps: false }
	)
}

module.exports = Type
