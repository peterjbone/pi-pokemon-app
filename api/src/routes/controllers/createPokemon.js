//* REGLA Y LOGICA
//* 1) El usuario solo puede crear pokemones NO-CANON
//* 2) Evitar que cree un pokemon SI-CANON
//* 3) Guardar en Redux y Postgresql
//* 4) NO hagas petición a API

const { Pokemon, Type } = require("../../db.js");

async function createPokemon(req, res) {
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
			console.log("Pokemon already existed.");
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
}

module.exports = createPokemon;
