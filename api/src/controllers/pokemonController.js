require("dotenv").config();
const axios = require("axios");
//const { Pokemon, Type } = require("../db.js");
const { Pokemon, Type } = require("../mongodb.js");
const { APIendpointPokemon } = process.env;

const getAllPokemons = async (req, res) => {
	try {
		const offset = parseInt(req.query.offset) || 0;
		const limit = 40;
		let response1;
		let response2;
		let apiPokemons;

		//* DEFINIENDO EL OFFSET Y EL LIMIT PARA HACER LA PETICION A LA API
		if (offset === 0) {
			//* Para la primera petición
			response1 = await axios.get(`${APIendpointPokemon}?offset=${0}&limit=${20}`);
			response2 = await axios.get(`${APIendpointPokemon}?offset=${20}&limit=${20}`);
			apiPokemons = response1.data.results.concat(response2.data.results);
		} else {
			//* Para el resto de la peticiones
			response1 = await axios.get(
				`${APIendpointPokemon}?offset=${offset}&limit=${20}`
			);
			response2 = await axios.get(
				`${APIendpointPokemon}?offset=${offset + 20}&limit=${20}`
			);
			apiPokemons = response1.data.results.concat(response2.data.results);
		}

		//* MAPEO EL ARRAY DE POKEMONS QUE ME DIO LA API
		const pokemons = await Promise.all(
			apiPokemons.map(async (pokemon) => {
				const { data } = await axios.get(pokemon.url);
				const { id, name, stats, sprites, height, weight, types } = data;

				//* reviso si el pokemon ya esta en BD
				const checkingPokemon = await Pokemon.findOne({ nombre: name }).populate(
					"types"
				);

				if (checkingPokemon) {
					console.log(`${checkingPokemon.nombre.toUpperCase()} already in DB.`);
					checkingPokemon.source = "DB";
					return checkingPokemon;
				}

				//* creando el documento del pokemon
				const newPokemon = {
					idApi: id,
					nombre: name,
					imagen: sprites.other["official-artwork"]["front_default"],
					vida: stats[0]["base_stat"],
					ataque: stats[1]["base_stat"],
					defensa: stats[2]["base_stat"],
					velocidad: stats[5]["base_stat"],
					altura: height,
					peso: weight
				};

				//* creo al nuevo pokemon en DB, inserto los ids y traigo otra vez al pokemon
				await Pokemon.create(newPokemon);

				types.forEach(async (item) => {
					const type = await Type.findOne({ nombre: item.type.name });
					await Pokemon.findOneAndUpdate(
						{ nombre: name },
						{
							$push: { types: type._id }
						}
					);
				});

				const DBPokemon = await Pokemon.findOne({ nombre: name }).populate("types");
				DBPokemon.source = "api";
				return DBPokemon;
			})
		);

		console.log("40 more pokemons were inserted in BD");
		return res.status(200).json({
			nextOffset: offset + limit,
			pokemons
		});
	} catch (error) {
		console.log(error);
		return res.status(500).send(error.message);
	}
};

module.exports = {
	getAllPokemons
};
