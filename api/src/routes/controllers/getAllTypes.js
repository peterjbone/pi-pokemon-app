const { Type } = require("../../db.js")
const axios = require("axios")
const endpoint = "https://pokeapi.co/api/v2/type"

//todo: 1) Validar que la entidad / tabla "Types" este vacío
//todo: 2) si lo esta debera consumir la API, guardar en BD y responder
//todo: 3) Sino La sgt vez que se pidan los favoritos se consumiran de la BD y responde

async function getAllTypes(req, res) {
	const registersCount = await Type.count()

	if (registersCount > 0) {
		//* entra en el IF cuando SI tiene registros
		console.log("DB has logs of Types already")
		const types = await Type.findAll()
		res.status(200).json(types)
	} else {
		//* entra al else y al try-catch cuando NO tiene registros
		console.log("Types were fetched in API")
		try {
			const { data } = await axios.get(endpoint)

			const types = data.results.map((type, index) => {
				return { id: index + 1, nombre: type.name } //* no tiene indice en 'PokeApi', colocando indices manualmente para la BD (act: si tienen indice pero es confuso)
			})

			Type.bulkCreate(types)

			return res.status(200).json(types)
		} catch (error) {
			//* Algún error de la 'PokeApi'
			return res.status(500).send(error.message)
		}
	}
}

module.exports = getAllTypes
