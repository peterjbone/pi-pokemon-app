//* LAS ACTIONS AFECTAN A REDUX (estado global) Y A POSTGRESQL (base de datos)

import axios from "axios";
import { ADD_POKE } from "./actions-types";

//? IMPORTADOS EN SearchBar.jsx
export function addPokemonByName(name) {
	const endpoint = "http://localhost:3001/pokename?name=";
	return async (dispatch) => {
		const { data } = await axios.get(`${endpoint}${name}`);
		return dispatch({
			type: ADD_POKE,
			payload: data
		});
	};
}

//? IMPORTADOS EN FormPokemon.jsx
export function addPokemonByBody(pokemon) {
	//? IMPORTADOS EN
	const endpoint = "http://localhost:3001/pokemons";
	return async (dispatch) => {
		const { data } = await axios.post(endpoint, pokemon);
		return dispatch({
			type: ADD_POKE,
			payload: data
		});
	};
}
