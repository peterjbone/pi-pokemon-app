const axios = require("axios");
const { Pokemon, Type } = require("../db.js");
const APIendpoint = "https://pokeapi.co/api/v2/pokemon/"; //* para buscar por ID
//const { v4: uuidv4 } = require("uuid");

const getAllPokemons = async (req, res) => {
	try {
		const response1 = await axios.get("https://pokeapi.co/api/v2/pokemon");

		const packPokemons1 = await Promise.all(
			response1.data.results.map(async (pokemon) => {
				const { data } = await axios.get(pokemon.url);
				const { id, forms, stats, sprites, height, weight, types } = data;
				const newPokemon = {
					id,
					nombre: forms[0].name,
					imagen: sprites.other["official-artwork"]["front_default"],
					vida: stats[0]["base_stat"],
					ataque: stats[1]["base_stat"],
					defensa: stats[2]["base_stat"],
					velocidad: stats[5]["base_stat"],
					altura: height,
					peso: weight,
					tipos: types.map((el) => el.type.name) //? solo trae el tipo desde la API
				};

				return newPokemon;
			})
		);

		const response2 = await axios.get(
			"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
		);

		const packPokemons2 = await Promise.all(
			response2.data.results.map(async (pokemon) => {
				const { data } = await axios.get(pokemon.url);
				const { id, forms, stats, sprites, height, weight, types } = data;
				const newPokemon = {
					id,
					nombre: forms[0].name,
					imagen: sprites.other["official-artwork"]["front_default"],
					vida: stats[0]["base_stat"],
					ataque: stats[1]["base_stat"],
					defensa: stats[2]["base_stat"],
					velocidad: stats[5]["base_stat"],
					altura: height,
					peso: weight,
					tipos: types.map((el) => el.type.name)
				};

				return newPokemon;
			})
		);

		const fullPokemons = packPokemons1.concat(packPokemons2);
		return res.status(200).json(fullPokemons);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

const createPokemon = async (req, res) => {
	//prettier-ignore
	const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, Types, source} = req.body

	//* si entra al IF la info esta completa
	if (nombre && imagen && vida && ataque && defensa && Types.length > 0) {
		let DBPokemon = await Pokemon.findOne({
			where: { nombre },
			include: {
				model: Type,
				attributes: ["id", "nombre"],
				through: { attributes: [] }
			}
		});

		//* La info SI esta completa y SI esta en BD
		if (DBPokemon) {
			console.log(`${DBPokemon.nombre.toUpperCase()} already existed.`);
			DBPokemon.dataValues.imagen = imagen;
			DBPokemon.dataValues.source = source;
			return res.status(200).json(DBPokemon);
			//! creo que es imposible que llegue aca por las validaciones del frontend
		} else {
			//* La info SI esta completa pero el pokemon NO esta en BD
			try {
				const newPokemon = {
					nombre,
					imagen,
					vida,
					ataque,
					defensa,
					velocidad,
					altura,
					peso
				};

				//* consiguiendo los id de los tipos al buscar coincidencias con el nombre en la BD
				const TypesId = await Promise.all(
					Types.map(async (type) => {
						const DBType = await Type.findOne({ where: { nombre: type } });
						return DBType.id;
					})
				);

				//* AQUI CREA AL POKEMON EN BD, HACE LA RELACION DE TIPO Y LUEGO LO VUELVE A BUSCAR EN BD
				let DBPokemon = await Pokemon.create(newPokemon);
				await DBPokemon.addType(TypesId);
				DBPokemon = await Pokemon.findOne({
					where: { nombre },
					include: {
						model: Type,
						attributes: ["id", "nombre"],
						through: { attributes: [] }
					}
				});

				console.log("Pokemon has been created.");
				DBPokemon.dataValues.source = source;
				return res.status(201).json(DBPokemon);
			} catch (error) {
				//* 1) Algun valor de un atributo puede estar mal
				//* 2) Algun error interno de Sequelize
				//! imposible que llegue aca por las validaciones del frontend
				return res.status(500).send(error.message);
			}
		}
	} else {
		//* si entra al ELSE la info esta incompleta
		//! imposible que llegue aca por las validaciones del frontend
		return res.status(400).send("Information is missing");
	}
};

const getPokemonById = async (req, res) => {
	const { id } = req.params;
	const paramsId = id;
	const pokemonWanted = await Pokemon.findOne({
		where: { id: paramsId },
		include: {
			model: Type,
			attributes: ["id", "nombre"],
			through: { attributes: [] }
		}
	});

	if (pokemonWanted) {
		console.log(
			`${pokemonWanted.nombre.toUpperCase()} already in the DataBase.`
		);
		return res.status(200).json(pokemonWanted);
	} else {
		try {
			console.log("Search made in API");
			const { data } = await axios.get(`${APIendpoint}${paramsId}`);
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
				peso: weight,
				Types: await Promise.all(
					types.map(async (el) => {
						const pokeTipo = await Type.findOne({
							where: { nombre: el.type.name }
						});
						return pokeTipo;
					})
				)
			};

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
			return res.status(200).json(newPokemon);
		} catch (error) {
			//* 1) Se entra al catch pq el ID de params no esta entre 1 y 1302
			//* 2) Entra aqui pq no hay registros en la tabla 'Types'
			console.error(error.message);
			return res.status(404).send("Pokemon not Founded.");
		}
	}
};

const deletePokemon = async (req, res) => {
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
};

module.exports = {
	getAllPokemons,
	createPokemon,
	getPokemonById,
	deletePokemon
};
