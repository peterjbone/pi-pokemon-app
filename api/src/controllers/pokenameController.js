const axios = require("axios");
//const { Pokemon, Type } = require("../db.js");
const { Pokemon, Type } = require("../mongodb.js");
//const APIendpointPokemon = "https://pokeapi.co/api/v2/pokemon/";
const { APIendpointPokemon } = process.env;

const getPokemonByName = async (req, res) => {
	const { name } = req.query;
	const queryName = name.trim().toLowerCase();

	//* reviso si el pokemon no se encuentra en BD
	const pokemonWanted = await Pokemon.findOne({ nombre: queryName }).populate(
		"types"
	);

	//* si el pokemon SI existe en la BD, te lo devuelve sin volver a buscar en API
	if (pokemonWanted) {
		console.log(`${pokemonWanted.nombre.toUpperCase()} already in DB.`);
		pokemonWanted._doc.source = "DB";
		return res.status(200).json(pokemonWanted);
	} else {
		//* si el pokemon NO existe en la BD, lo buscara en la API y luego lo guarda en BD
		try {
			console.log("Search made in API");
			const { data } = await axios.get(`${APIendpointPokemon}/${queryName}`);

			const { id, name, stats, sprites, height, weight, types } = data;
			//console.log(types);

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

			//* AQUI CREA AL POKEMON EN BD, HACE LA RELACION DE TIPO Y LUEGO LO VUELVE A BUSCAR EN BD
			await Pokemon.create(newPokemon);

			//para darle tiempo a que se cumplan todas las promesas
			await Promise.all(
				types.map(async (item) => {
					const type = await Type.findOne({ nombre: item.type.name });

					await Pokemon.findOneAndUpdate(
						{ nombre: name },
						{
							$push: { types: type._id }
						},
						{ new: true }
					);

					return { ...item }; // no es necesario esto
				})
			);

			const DBPokemon = await Pokemon.findOne({ nombre: name }).populate("types");
			DBPokemon._doc.source = "api";
			//DBPokemon.origen = "api";
			//DBPokemon["fuente"] = "api";
			//Object.assign(DBPokemon, { fuente: "api" });
			//const result = { ...DBPokemon, source: "api" };
			return res.status(200).json(DBPokemon);
		} catch (error) {
			console.log(error);
			return res.status(500).send(error.message);
		}
	}
};

module.exports = {
	getPokemonByName
};
