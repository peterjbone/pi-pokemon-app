import { create } from "zustand";
import axios, { all } from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

//* store
export const usePokemonStore = create((set, get) => ({
	//* initial states
	allPokemons: [], //? esto es un backup de todos los pokemons
	selectedPokemons: [], //? estos siempre seran los pokemons usaras en el front
	offset: 0,
	filterActivated: false,
	sortActivated: false,
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
		//? lo uso para borrar todo cuando se recarga la pagina
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
				selectedPokemons: [...state.allPokemons],
				sortActivated: false
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
			allPokemons: [...state.allPokemons],
			sortActivated: true
		}));
		return;
	},
	sortById: (sort) => {
		const selectedPokemons = get().selectedPokemons;
		const pokemonsCopy = [...structuredClone(selectedPokemons)];
		let isSort;

		if (sort === "A") {
			//? this is the default option too
			pokemonsCopy.sort((a, b) => a.idApi - b.idApi);
			isSort = false;
		}
		if (sort === "D") {
			pokemonsCopy.sort((a, b) => b.idApi - a.idApi);
			isSort = true;
		}

		set((state) => ({
			...state,
			selectedPokemons: pokemonsCopy,
			sortActivated: isSort
		}));
	},
	sortByAttack: (sort) => {
		if (sort === "default") {
			set((state) => ({
				...state,
				selectedPokemons: [...state.allPokemons],
				sortActivated: false
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
			selectedPokemons: pokemonsCopy,
			sortActivated: true
		}));
		return;
	},
	//? FILTERS
	filterByType: (filter) => {
		if (filter === "all") {
			set((state) => ({
				...state,
				selectedPokemons: [...structuredClone(state.allPokemons)],
				filterActivated: false,
				sortActivated: false
			}));
			return;
		}

		const allPokemons = get().allPokemons;
		switch (filter) {
			case "normal": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "normal") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons,
					//? se devuelve el array vacio o lleno
					filterActivated: true
				}));
				return;
			}

			case "fighting": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "fighting") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "flying": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "flying") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "poison": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "poison") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "ground": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "ground") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "rock": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "rock") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "bug": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "bug") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "ghost": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "ghost") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "steel": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "steel") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "fire": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "fire") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "water": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "water") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "grass": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "grass") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "electric": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "electric") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "psychic": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "psychic") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "ice": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "ice") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "dragon": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "dragon") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "dark": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "dark") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "fairy": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "fairy") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "unknown": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "unknown") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			case "shadow": {
				const filteredPokemons = [];

				allPokemons.forEach((pokemon) => {
					const newPokemon = pokemon;
					pokemon.Types.forEach((type) => {
						if (type.nombre === "shadow") {
							filteredPokemons.push(newPokemon);
						}
					});
				});

				set((state) => ({
					...state,
					//? los otros estados se quedan igual
					selectedPokemons: filteredPokemons
					//? se devuelve el array vacio o lleno
				}));
				return;
			}

			default: {
				set((state) => ({ ...state }));
				return;
			}
		}
	},
	filterByGeneration: (filter) => {}
}));
