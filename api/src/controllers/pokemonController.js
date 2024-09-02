const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

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
			console.log(`${DBPokemon.nombre.toUpperCase()} already in DB.`);
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
