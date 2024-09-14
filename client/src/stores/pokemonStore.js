import { create } from "zustand";
import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

//* store
export const usePokemonStore = create((set, get) => ({
	//* initial states
	allPokemons: [],
	selectedPokemons: [],
	offset: 0,
	//* actions
	getFortyPokemons: async () => {
		const offset = get().offset; //? actual offset desde el estado global
		const { data } = await axios.get(
			`${VITE_BACKEND_URL}/pokemons?offset=${offset}`
		);

		set((state) => ({
			allPokemons: [...state.allPokemons, ...data.pokemons],
			selectedPokemons: [...state.selectedPokemons, ...data.pokemons],
			offset: data.nextOffset //? nuevo offset desde el backend
		}));
	},
	sortByName: (sort) => {
		const selectedPokemons = get().selectedPokemons;
		if (sort === "default") {
			set((state) => ({
				...state,
				allPokemons: [...state.allPokemons],
				selectedPokemons: [...state.allPokemons]
			}));
		}

		const pokemonsCopy = [...structuredClone(selectedPokemons)];
		if (sort === "A") {
			pokemonsCopy.sort((a, b) => a.nombre.localeCompare(b.nombre));
		}
		if (sort === "D") {
			pokemonsCopy.sort((a, b) => b.nombre.localeCompare(a.nombre));
		}
		set((state) => ({
			...state,
			allPokemons: [...state.allPokemons],
			selectedPokemons: pokemonsCopy
		}));
	}
}));
