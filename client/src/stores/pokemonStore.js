import { create } from "zustand";

//* store
export const usePokemonStore = create((set, get) => ({
	//* initial states
	allPokemons: [],
	selectedPokemons: []
	//* actions
}));
