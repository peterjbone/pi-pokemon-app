import { create } from "zustand";
import axios from "axios";

//* store
export const usePokemonStore = create((set, get) => ({
	//* initial states
	allPokemons: [],
	selectedPokemons: [],
	//* actions
	getAllPokemons: async () => {
		const endpoint = "";
		const { data } = axios.get(`${endpoint}`);
	}
}));
