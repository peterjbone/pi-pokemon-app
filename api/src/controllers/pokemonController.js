const axios = require("axios");

export const getAllPokemons = async (req, res) => {
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
