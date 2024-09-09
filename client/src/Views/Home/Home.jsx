import styles from "./Home.module.css";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";
import DarkMode from "../../Components/DarkMode/DarkMode.jsx";
import Cards from "../../Components/Cards/Cards.jsx";
import { usePokemonStore } from "../../stores/pokemonStore.js";

function Home() {
	const { VITE_BACKEND_URL } = import.meta.env;
	const allPokemons = usePokemonStore((state) => state.allPokemons);
	const selectedPokemons = usePokemonStore((state) => state.selectedPokemons);
	const getFortyPokemons = usePokemonStore((state) => state.getFortyPokemons);

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
		<div className={styles.home}>
			{/* MODO OSCURO */}
			<DarkMode />
			{/* BARRA DE BUSQUEDA */}
			<SearchBar />
			{/* CREAR TU POKEMON - FORMULARIO */}
			<div className={styles.formLink}>
				<Link to="/form">
					<img src="../../../public/pokebola.png" alt="Pokebola"></img>
				</Link>
				<FaArrowUp />
				<p>Crea tu Pokemon</p>
			</div>
			{/* CARDS */}
			<Cards pokemons={selectedPokemons} />
		</div>
	);
}

export default Home;
