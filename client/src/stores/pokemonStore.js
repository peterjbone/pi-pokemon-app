import { create } from "zustand";
import axios from "axios";
import {VITE_BACKEND_URL} from import.meta.env


//* store
export const usePokemonStore = create((set, get) => ({
	//* initial states
	allPokemons: [],
  selectedPokemons: [],
  offset: 0,
	//* actions
  getFortyPokemons: async () => {
    const offset = get().offset; //? antiguo offset desde el estado global
    const { data } = await axios.get(`${VITE_BACKEND_URL}/pokemons?offset=${offset}`);
    console.log(data);
    
    set((state) => (
      {
        allPokemons: [...state.allPokemons, ...data.pokemons],
        selectedPokemons: [...state.selectedPokemons, ...data.pokemons],
        offset: data.nextOffset //? nuevo offset desde el backend
      }
    ))
	}
}));
