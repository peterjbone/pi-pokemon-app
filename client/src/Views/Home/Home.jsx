import styles from "./Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import SearchBar from "../../Components/SearchBar/SearchBar.jsx";
import DarkMode from "../../Components/DarkMode/DarkMode.jsx";
import Cards from "../../Components/Cards/Cards.jsx";

function Home() {
	const URLGetAllTypes = "http://localhost:3001/types";
	const URLGetAllPokemons = "http://localhost:3001/pokemons";
	const [defaultPokemons, setDefaultPokemons] = useState([]);

	useEffect(() => {
		async function fetchPokemones() {
			try {
				const { data } = await axios.get(URLGetAllPokemons); //* obtiene a todos los pokemons de ¿?
				setDefaultPokemons(data); //* guardando todos los pokemons en el estado local
				await axios.get(URLGetAllTypes); //* guardar todos los tipos en BD al cargar home
			} catch (error) {
				console.error(
					"Error al obtener a los pokemones y/o los tipos:",
					error.message
				);
			}
		}

		fetchPokemones();
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
			<Cards />
		</div>
	);
}

export default Home;
