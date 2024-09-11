//import styles from "./Home.module.css";
import axios from "axios";
import { useEffect } from "react";
import Cards from "../../Components/Cards/Cards.jsx";
import { usePokemonStore } from "../../stores/pokemonStore.js";
import Navbar from "../../Components/Navbar/Navbar.jsx";

function Home() {
	const { VITE_BACKEND_URL } = import.meta.env;
	const selectedPokemons = usePokemonStore((state) => state.selectedPokemons);
	const getFortyPokemons = usePokemonStore((state) => state.getFortyPokemons);

	//* traemos los primeros 40 pokemons
	useEffect(() => {
		async function getInitialPokemons() {
			try {
				await axios.get(`${VITE_BACKEND_URL}/types`); //* trae y guarda los tipos en BD
				await getFortyPokemons(); //* obtiene 40 pokemons y los guarda en BD y en zustand
			} catch (error) {
				console.log(error);
				console.log("Error de la función getInitialPokemons", error.message);
			}
		}

		getInitialPokemons();
	}, []);

	//************************************COMPONENT HOME******************/
	return (
		<div>
			{/* NAVBAR */}
			<Navbar />
			{/* CARDS */}
			<Cards pokemons={selectedPokemons} />
		</div>
	);
}

export default Home;
