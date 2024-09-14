import {
	ADD_POKE,
	FILTER_TYPE,
	ORDER_ALPHA,
	ORDER_ATTACK
} from "../Actions/actions-types.js";

let initialState = {
	selectedPokemons: [],
	allPokemons: []
};

function rootReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ADD_POKE:
			return {
				...state,
				selectedPokemons: [payload, ...state.allPokemons],
				allPokemons: [payload, ...state.allPokemons]
			};

		case FILTER_TYPE: {
			if (payload === "default") {
				return {
					...state,
					selectedPokemons: [...state.allPokemons],
					allPokemons: [...state.allPokemons]
				};
			}

			if (payload === "normal") {
				const normalPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "normal") {
							normalPokemons.push(newPoke);
						}
					});
				});

				return !normalPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: normalPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "fighting") {
				const fightingPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "fighting") {
							fightingPokemons.push(newPoke);
						}
					});
				});

				return !fightingPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: fightingPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "flying") {
				const flyingPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "flying") {
							flyingPokemons.push(newPoke);
						}
					});
				});

				return !flyingPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: flyingPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "poison") {
				const poisonPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "poison") {
							poisonPokemons.push(newPoke);
						}
					});
				});

				return !poisonPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: poisonPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "ground") {
				const groundPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "ground") {
							groundPokemons.push(newPoke);
						}
					});
				});

				return !groundPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: groundPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "rock") {
				const rockPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "rock") {
							rockPokemons.push(newPoke);
						}
					});
				});

				return !rockPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: rockPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "bug") {
				const bugPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "bug") {
							bugPokemons.push(newPoke);
						}
					});
				});

				return !bugPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: bugPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "ghost") {
				const ghostPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "ghost") {
							ghostPokemons.push(newPoke);
						}
					});
				});

				return !ghostPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: ghostPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "steel") {
				const steelPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "steel") {
							steelPokemons.push(newPoke);
						}
					});
				});

				return !steelPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: steelPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "fire") {
				const firePokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "fire") {
							firePokemons.push(newPoke);
						}
					});
				});

				return !firePokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: firePokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "water") {
				const waterPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "water") {
							waterPokemons.push(newPoke);
						}
					});
				});

				return !waterPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: waterPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "grass") {
				const grassPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "grass") {
							grassPokemons.push(newPoke);
						}
					});
				});

				return !grassPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: grassPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "electric") {
				const electricPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "electric") {
							electricPokemons.push(newPoke);
						}
					});
				});

				return !electricPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: electricPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "psychic") {
				const psychicPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "psychic") {
							psychicPokemons.push(newPoke);
						}
					});
				});

				return !psychicPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: psychicPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "ice") {
				const icePokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "ice") {
							icePokemons.push(newPoke);
						}
					});
				});

				return !icePokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: icePokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "dragon") {
				const dragonPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "dragon") {
							dragonPokemons.push(newPoke);
						}
					});
				});

				return !dragonPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: dragonPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "dark") {
				const darkPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "dark") {
							darkPokemons.push(newPoke);
						}
					});
				});

				return !darkPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: darkPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "fairy") {
				const fairyPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "fairy") {
							fairyPokemons.push(newPoke);
						}
					});
				});

				return !fairyPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: fairyPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "unknown") {
				const unknownPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "unknown") {
							unknownPokemons.push(newPoke);
						}
					});
				});

				return !unknownPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: unknownPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}

			if (payload === "shadow") {
				const shadowPokemons = [];

				state.allPokemons.forEach((pokemon) => {
					const newPoke = pokemon;
					pokemon.Types.forEach((tipo) => {
						if (tipo.nombre === "shadow") {
							shadowPokemons.push(newPoke);
						}
					});
				});

				return !shadowPokemons.length
					? {
							...state,
							selectedPokemons: [...state.allPokemons],
							allPokemons: [...state.allPokemons]
					  }
					: {
							...state,
							selectedPokemons: shadowPokemons,
							allPokemons: [...state.allPokemons]
					  };
			}
		}

		case ORDER_ALPHA: {
			if (payload === "default") {
				return {
					...state,
					selectedPokemons: [...state.allPokemons],
					allPokemons: [...state.allPokemons]
				};
			}

			const pokemonsCopy = [...structuredClone(state.selectedPokemons)];

			if (payload === "A") {
				pokemonsCopy.sort((a, b) => a.nombre.localeCompare(b.nombre));
			}

			if (payload === "D") {
				pokemonsCopy.sort((a, b) => b.nombre.localeCompare(a.nombre));
			}

			return {
				...state,
				selectedPokemons: pokemonsCopy,
				allPokemons: [...state.allPokemons]
			};
		}

		case ORDER_ATTACK: {
			if (payload === "default") {
				return {
					...state,
					selectedPokemons: [...state.allPokemons],
					allPokemons: [...state.allPokemons]
				};
			}

			const pokemonsCopy = [...structuredClone(state.selectedPokemons)];

			if (payload === "A") {
				pokemonsCopy.sort((a, b) => a.ataque - b.ataque);
			}

			if (payload === "D") {
				pokemonsCopy.sort((a, b) => b.ataque - a.ataque);
			}

			return {
				...state,
				selectedPokemons: pokemonsCopy,
				allPokemons: [...state.allPokemons]
			};
		}

		default:
			return { ...state };
	}
}

export default rootReducer;
