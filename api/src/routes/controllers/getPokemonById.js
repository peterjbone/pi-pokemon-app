//* ESTE CONTROLADOR NO DEBE GUARDAR EN BD
//* 1) Solo busca en BD y devuelve
//* 2) o Va busca en la API y devuelve

const axios = require("axios")
const { Pokemon, Type } = require("../../db.js")
const endpoint = "https://pokeapi.co/api/v2/pokemon/"

async function getPokemonById(req, res) {
	const { id } = req.params
	const paramsId = id
	const pokemonWanted = await Pokemon.findOne({
		where: { id: paramsId },
		include: {
			model: Type,
			attributes: ["id", "nombre"],
			through: { attributes: [] }
		}
	})

	if (pokemonWanted) {
		console.log(`${pokemonWanted.nombre.toUpperCase()} already in the DataBase.`)
		return res.status(200).json(pokemonWanted)
	} else {
		try {
			console.log("Search made in API")
			const { data } = await axios.get(`${endpoint}${paramsId}`)
			const { id, name, stats, sprites, height, weight, types } = data
			const newPokemon = {
				id,
				nombre: name,
				imagen: sprites.other["official-artwork"]["front_default"],
				vida: stats[0]["base_stat"],
				ataque: stats[1]["base_stat"],
				defensa: stats[2]["base_stat"],
				velocidad: stats[5]["base_stat"],
				altura: height,
				peso: weight,
				Types: await Promise.all(
					types.map(async (el) => {
						const pokeTipo = await Type.findOne({ where: { nombre: el.type.name } })
						return pokeTipo
					})
				)
			}

			//? Creo este TypesId manualmente para crear la relación de pokemons_x_types (busco el indice del tipo en la BD)
			// const TypesId = await Promise.all(
			// 	types.map(async (el) => {
			// 		const DBType = await Type.findOne({ where: { nombre: el.type.name } })
			// 		return DBType.id
			// 	})
			// )

			//? Guardando / Creando registro en BD y Creando la relación con Types
			// let DBPokemon = await Pokemon.create(newPokemon)
			// await DBPokemon.addType(TypesId)

			//? Respuesta JSON
			// DBPokemon = await Pokemon.findOne({
			// 	where: { id },
			// 	include: {
			// 		model: Type,
			// 		attributes: ["id", "nombre"],
			// 		through: { attributes: [] }
			// 	}
			// })
			return res.status(200).json(newPokemon)
		} catch (error) {
			//* 1) Se entra al catch pq el ID de params no esta entre 1 y 1302
			//* 2) Entra aqui pq no hay registros en la tabla 'Types'
			console.error(error.message)
			return res.status(404).send("Pokemon not Founded.")
		}
	}
}

module.exports = getPokemonById
