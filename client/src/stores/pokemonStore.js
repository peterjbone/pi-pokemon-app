import { create } from "zustand";
import axios, { all } from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

//* store
export const usePokemonStore = create((set, get) => ({
	//* initial states
	allPokemons: [], //? esto es un backup de todos los pokemons
	selectedPokemons: [], //? estos siempre seran los pokemons usaras en el front
	offset: 0,
	//* actions
	getFortyPokemons: async (currentOffset = 0) => {
		try {
			const { data } = await axios.get(
				`${VITE_BACKEND_URL}/pokemons?offset=${currentOffset}`
			);

			set((state) => ({
				allPokemons: [...state.allPokemons, ...data.pokemons],
				selectedPokemons: [...state.selectedPokemons, ...data.pokemons],
				offset: data.nextOffset //? seteo el nuevo offset (cuantos pokemons tengo ahora)
			}));
		} catch (error) {
			console.log(error);
		}
	},
	resetPokemons: () => {
		set((state) => ({
			...state,
			allPokemons: [],
			selectedPokemons: [],
			offset: 0
		}));
	},
	//? SORTS
	sortByName: (sort) => {
		if (sort === "default") {
			set((state) => ({
				...state,
				selectedPokemons: [...state.allPokemons]
			}));
			return;
		}

		const selectedPokemons = get().selectedPokemons;
		const pokemonsCopy = [...structuredClone(selectedPokemons)];
		if (sort === "A") {
			pokemonsCopy.sort((a, b) => a.nombre.localeCompare(b.nombre));
		}
		if (sort === "D") {
			pokemonsCopy.sort((a, b) => b.nombre.localeCompare(a.nombre));
		}
		set((state) => ({
			...state,
			selectedPokemons: pokemonsCopy,
			allPokemons: [...state.allPokemons]
		}));
		return;
	},
	sortById: (sort) => {
		const selectedPokemons = get().selectedPokemons;
		const pokemonsCopy = [...structuredClone(selectedPokemons)];

		if (sort === "A") {
			pokemonsCopy.sort((a, b) => a.idApi - b.idApi);
		}
		if (sort === "D") {
			pokemonsCopy.sort((a, b) => b.idApi - a.idApi);
		}

		set((state) => ({
			...state,
			selectedPokemons: pokemonsCopy,
			allPokemons: [...state.allPokemons]
		}));
	},
	sortByAttack: (sort) => {
		if (sort === "default") {
			set((state) => ({
				...state,
				selectedPokemons: [...state.allPokemons]
			}));
			return;
		}

		const selectedPokemons = get().selectedPokemons;
		const pokemonsCopy = [...structuredClone(selectedPokemons)];
		if (sort === "A") {
			pokemonsCopy.sort((a, b) => a.ataque - b.ataque);
		}
		if (sort === "D") {
			pokemonsCopy.sort((a, b) => b.ataque - a.ataque);
		}
		set((state) => ({
			...state,
			selectedPokemons: pokemonsCopy
		}));
		return;
	}
}));
