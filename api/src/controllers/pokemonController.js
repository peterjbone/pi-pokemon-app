require("dotenv").config();
const axios = require("axios");
const { Pokemon, Type } = require("../db.js");
const { APIendpoint } = process.env;

const getAllPokemons = async (req, res) => {
	try {
		const offset = parseInt(req.query.offset) || 0;
		const limit = 40;
		let response1;
		let response2;
		let apiPokemons;

		if (offset === 0) {
			//* Para la primera petición
			response1 = await axios.get(`${APIendpoint}?offset=${0}&limit=${20}`);
			response2 = await axios.get(`${APIendpoint}?offset=${20}&limit=${20}`);
			apiPokemons = response1.data.results.concat(response2.data.results);
		} else {
			//* Para el resto de la peticiones
			response1 = await axios.get(
				`${APIendpoint}?offset=${offset}&limit=${20}`
			);
			response2 = await axios.get(
				`${APIendpoint}?offset=${offset + 20}&limit=${20}`
			);
			apiPokemons = response1.data.results.concat(response2.data.results);
		}

		//* MAPEO EL ARRAY DE POKEMONS QUE ME DIO LA API
		const pokemons = await Promise.all(
			apiPokemons.map(async (pokemon) => {
				const { data } = await axios.get(pokemon.url);
				const { name, stats, sprites, height, weight, types } = data;

				//* reviso si el pokemon ya esta en BD
				const checkingPokemon = await Pokemon.findOne({
					where: { nombre: name },
					include: {
						model: Type,
						attributes: ["id", "nombre"],
						through: { attributes: [] }
					}
				});
				if (checkingPokemon) {
					console.log(checkingPokemon);
					checkingPokemon.dataValues.source = "DB";
					return checkingPokemon;
				}

				//* creando nuevo pokemon
				const newPokemon = {
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
							where: { nombre: el.type.name } //?busca coincidencia con el tipo de pokemon
						});
						return DBType.id; //? solo devuelve el id del tipo (númerico)
					})
				);

				//* AQUI CREA AL POKEMON EN BD, HACE LA RELACION DE TIPO Y LUEGO LO VUELVE A BUSCAR EN BD
				let DBPokemon = await Pokemon.create(newPokemon);
				await DBPokemon.addType(TypesId);
				DBPokemon = await Pokemon.findOne({
					where: { nombre: name },
					include: {
						model: Type,
						attributes: ["id", "nombre"],
						through: { attributes: [] }
					}
				});
				DBPokemon.dataValues.source = "api";
				return DBPokemon;
			})
		);

		console.log("40 pokemons were inserted in BD.");
		return res.status(200).json({
			nextOffset: offset + limit,
			pokemons
		});
	} catch (error) {
		console.log(error);
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
	deletePokemon
};
