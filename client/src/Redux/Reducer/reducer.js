//* Actions types
import { ADD_POKE, REMOVE_POKE } from "../Actions/actions"

//* Initial state
let initialState = {
	pokemons: []
}

//* Reducer function

function rootReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ADD_POKE:
			break

		default:
			break
	}
}

export default rootReducer
