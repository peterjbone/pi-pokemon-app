const axios = require("axios");
const { Pokemon, Type } = require("../../db.js");
const endpoint = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemonByName(req, res) {
	const { name } = req.query;
	const queryName = name.trim().toLowerCase();
	const pokemonWanted = await Pokemon.findOne({
		where: { nombre: queryName },
		include: {
			model: Type,
			attributes: ["nombre"],
			through: { attributes: [] }
		}
	});

	//* si el pokemon SI existe en la BD, te lo devuelve sin volver a buscar en API
	if (pokemonWanted) {
		console.log(`${pokemonWanted.nombre.toUpperCase()} already in DB.`);
		pokemonWanted.dataValues.source = "api";
		return res.status(200).json(pokemonWanted);
	} else {
		//* si el pokemon NO existe en la BD, lo buscara en la API y luego lo guarda en BD
		try {
			console.log("Search made in API");
			const { data } = await axios.get(`${endpoint}${queryName}`);
			const { id, name, stats, sprites, height, weight, types } = data;
			const newPokemon = {
				id,
				nombre: name,
				imagen: sprites.other["official-artwork"]["front_default"],
				vida: stats[0]["base_stat"],
				ataque: stats[1]["base_stat"],
				defensa: stats[2]["base_stat"],
				velocidad: stats[5]["base_stat"],
				altura: height,
				peso: weight
			};

			const TypesId = await Promise.all(
				types.map(async (el) => {
					const DBType = await Type.findOne({
						where: { nombre: el.type.name }
					});
					return DBType.id;
				})
			);
			console.log(TypesId);

			let DBPokemon = await Pokemon.create(newPokemon);
			await DBPokemon.addType(TypesId);
			DBPokemon = await Pokemon.findOne({
				where: { id },
				include: {
					model: Type,
					attributes: ["id", "nombre"],
					through: { attributes: [] }
				}
			});

			//* agrego la info de donde vino este Pokemon
			DBPokemon.dataValues.source = "api";
			return res.status(200).json(DBPokemon);
		} catch (error) {
			console.error(error.message);
			return res.status(404).send("Pokemon not founded");
		}
	}
}

module.exports = getPokemonByName;
