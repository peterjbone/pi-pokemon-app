import axios from "axios";
import React, { useState, useEffect } from "react";
import Cards from "../../Components/Cards/Cards.jsx";
import { usePokemonStore } from "../../stores/pokemonStore.js";
import Navbar from "../../Components/Navbar/Navbar.jsx";
//import SearchBar from "../../Components/SearchBar/SearchBar.jsx";

function Home() {
	const { VITE_BACK_URL } = import.meta.env;
	const apiBackUrl = VITE_BACK_URL;
	const [initialUpload, setInitialUpload] = useState(true);
	const [isBottom, setIsBottom] = useState(false);

	//* estados globales
	const selectedPokemons = usePokemonStore((state) => state.selectedPokemons);
	const offset = usePokemonStore((state) => state.offset);
	const filterActivated = usePokemonStore((state) => state.filterActivated);
	const sortActivated = usePokemonStore((state) => state.sortActivated);

	//* acciones
	const getFortyPokemons = usePokemonStore((state) => state.getFortyPokemons);
	const resetPokemons = usePokemonStore((state) => state.resetPokemons);

	//* 1) traemos los primeros 40 pokemons
	useEffect(() => {
		async function getInitialPokemons() {
			if (!initialUpload) return;
			try {
				await axios.get(`${apiBackUrl}/types`); //? trae y guarda los tipos en BD
				resetPokemons(); //? resetea los estados globales
				await getFortyPokemons(); //? obtiene los primeros 40 pokemons
				setInitialUpload(false); //? indica que ya se realizo la carga inicial
			} catch (error) {
				console.log(error);
			}
		}

		getInitialPokemons();
	}, [initialUpload]);

	//* 2 escuchar evento scroll y saber cuando el usuario llego al final
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY || document.documentElement.scrollTop;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			if (scrollTop + windowHeight >= documentHeight - 1) {
				setIsBottom(true);
			} else {
				setIsBottom(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	//* 3) Pido al siguiente grupo de pokemons
	useEffect(() => {
		async function getMorePokemons() {
			try {
				await getFortyPokemons(offset);
			} catch (error) {
				console.log(error);
			}
		}

		if (isBottom && !filterActivated && !sortActivated) {
			getMorePokemons();
		}
	}, [isBottom, filterActivated, sortActivated]);

	//************************************ COMPONENT HOME
	return (
		<div>
			{/* NAVBAR */}
			<Navbar />
			{/* SEARCH BAR */}
			{/* TYPES LINKS */}
			{/* GENERATIONS LINKS */}
			{/* CARDS */}
			<Cards
				pokemons={selectedPokemons}
				filterActivated={filterActivated}
				sortActivated={sortActivated}
			/>
		</div>
	);
}

export default Home;
