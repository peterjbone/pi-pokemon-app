//* LAS ACTIONS AFECTAN A REDUX (estado global) Y A POSTGRESQL (base de datos)

import axios from "axios";
import {
	ADD_POKE,
	ORDER_ALPHA,
	ORDER_ATTACK,
	FILTER_TYPE
} from "./actions-types";

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

export function addPokemonByBody(pokemon) {
	const endpoint = "http://localhost:3001/pokemons";
	return async (dispatch) => {
		const { data } = await axios.post(endpoint, pokemon);
		return dispatch({
			type: ADD_POKE,
			payload: data
		});
	};
}

export function filterByType(type) {
	return {
		type: FILTER_TYPE,
		payload: type
	};
}

export function orderByAlpha(order) {
	return {
		type: ORDER_ALPHA,
		payload: order
	};
}

export function orderByAttack(order) {
	return {
		type: ORDER_ATTACK,
		payload: order
	};
}
