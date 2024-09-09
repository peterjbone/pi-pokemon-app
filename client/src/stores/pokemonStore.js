import { create } from "zustand";
import axios from "axios";
import {VITE_BACKEND_URL} from import.meta.env


//* store
export const usePokemonStore = create((set, get) => ({
	//* initial states
	allPokemons: [],
	selectedPokemons: [],
	//* actions
	getFortyPokemons: async () => {
    const { data } = axios.get(`${VITE_BACKEND_URL}/pokemons`);
    set((state) => (
      {
        allPokemons: [...state.allPokemons, ...data],
        selectedPokemons: [...state.selectedPokemons, ...data]
      }
    ))
	}
}));
