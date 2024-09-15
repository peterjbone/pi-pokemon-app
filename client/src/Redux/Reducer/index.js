let initialState = {
	selectedPokemons: [],
	allPokemons: []
};

function rootReducer(state = initialState, { type, payload }) {
	switch (type) {
		default:
			return { ...state };
	}
}

export default rootReducer;
