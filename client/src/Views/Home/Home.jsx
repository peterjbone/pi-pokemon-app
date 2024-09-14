import axios from "axios";
import React, { useState, useEffect } from "react";
import Cards from "../../Components/Cards/Cards.jsx";
import { usePokemonStore } from "../../stores/pokemonStore.js";
import Navbar from "../../Components/Navbar/Navbar.jsx";

function Home() {
	const { VITE_BACKEND_URL } = import.meta.env;
	const [initialUpload, setInitialUpload] = useState(true);
	//* estados globales
	const selectedPokemons = usePokemonStore((state) => state.selectedPokemons);
	const offset = usePokemonStore((state) => state.offset);
	//* acciones
	const getFortyPokemons = usePokemonStore((state) => state.getFortyPokemons);
	const resetPokemons = usePokemonStore((state) => state.resetPokemons);

	//* traemos los primeros 40 pokemons
	useEffect(() => {
		async function getInitialPokemons() {
			if (!initialUpload) return;
			try {
				await axios.get(`${VITE_BACKEND_URL}/types`); //* trae y guarda los tipos en BD
				resetPokemons();
				await getFortyPokemons(); //* obtiene 40 pokemons y los guarda en BD y en zustand
				setInitialUpload(false);
			} catch (error) {
				console.log(error);
			}
		}

		getInitialPokemons();
	}, [initialUpload]);

	//************************************COMPONENT HOME******************/
	return (
		<div>
			{console.log(offset)}
			{console.log(selectedPokemons)}
			{/* NAVBAR */}
			<Navbar />
			{/* CARDS */}
			<Cards pokemons={selectedPokemons} />
		</div>
	);
}

export default Home;
