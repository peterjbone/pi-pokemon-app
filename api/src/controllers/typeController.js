const axios = require("axios");
//const APIendpointType = "https://pokeapi.co/api/v2/type";
const { APIendpointType } = process.env;
//const { Type } = require("../db.js");
const { Type } = require("../mongodb.js");

//* 1) Validar que la entidad / tabla "Types" este vacío
//* 2) si lo esta debera consumir la API, guardar en BD y responder
//* 3) Sino La sgt vez que se pidan los favoritos se consumiran de la BD y responde

const getAllTypes = async (req, res) => {
	const registersCount = await Type.countDocuments();
	console.log(registersCount);

	if (registersCount > 0) {
		//* entra en el IF cuando SI tiene registros
		console.log("DB has logs of Types already");
		const types = await Type.find();
		return res.status(200).json(types);
	} else {
		//* entra al else y al try-catch cuando NO tiene registros
		console.log("Types were fetched in API");
		try {
			const { data } = await axios.get(APIendpointType);

			const types = data.results.map((item) => {
				return { nombre: item.name }; //* no tiene indice en 'PokeApi', colocando indices manualmente para la BD (act: si tienen indice pero es confuso)
			});

			//Type.bulkCreate(types);
			await Type.create(types);

			return res.status(200).json(types);
		} catch (error) {
			//* Algún error de la api
			//* Algún error de mongoose
			console.log(error);
			return res.status(500).send(error.message);
		}
	}
};

module.exports = {
	getAllTypes
};
