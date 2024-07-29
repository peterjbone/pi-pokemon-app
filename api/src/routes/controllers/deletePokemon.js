const { Pokemon } = require("../../db.js");

async function deletePokemon(req, res) {
	const { nombre } = req.params;

	try {
		const deletedRegisters = await Pokemon.destroy({ where: { nombre } });

		if (deletedRegisters > 0) {
			return res.status(200).send(`Se ha eliminado a ${nombre} de la BD.`);
		} else {
			return res
				.status(404)
				.send(
					`No se encontro el Pokemon con el id: ${id} o ya ha sido eliminado.`
				);
		}
	} catch (error) {
		//* Erro interno de sequelize
		console.log("Entro al catch del deletePokemon");
		return res.status(500).send(error.message);
	}
}

module.exports = deletePokemon;
