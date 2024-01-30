import "./Home.css"
import axios from "axios"
import { useEffect, useState } from "react"

import { Link } from "react-router-dom"
import { FaArrowUp } from "react-icons/fa"
import { TiArrowDownThick } from "react-icons/ti"
import SearchBar from "../../Components/SearchBar/SearchBar.jsx"
import DarkMode from "../../Components/DarkMode/DarkMode.jsx"
import Carousel from "../../Components/Carousel/Carousel"
import Cards from "../../Components/Cards/Cards.jsx"

function Home() {
	//******** llamando a los pokemones iniciales y guardando todos los tipos en la DB
	const URLGetAllTypes = "http://localhost:3001/types"
	const URLGetAllPokemons = "http://localhost:3001/pokemons"
	const [defaultPokemons, setDefaultPokemons] = useState([])

	useEffect(() => {
		async function fetchPokemones() {
			try {
				const { data } = await axios.get(URLGetAllPokemons)
				setDefaultPokemons(data)
				await axios.get(URLGetAllTypes)
			} catch (error) {
				console.error(
					"Error al obtener a los pokemones y/o los tipos:",
					error.message
				)
			}
		}

		fetchPokemones()
	}, [])
	//*******************************************************************

	return (
		<div className="home">
			{/* DARK MODE TOGGLE */}
			<DarkMode />
			{/* SEARCH BAR */}
			<SearchBar />
			{/* FORM LINK */}
			<div className="form-link">
				<Link to="/form">
					<img src="../../../public/pokebola.png" alt="Pokebola"></img>
				</Link>
				<FaArrowUp />
				<p>Crea tu Pokemon</p>
			</div>
			{/*  CAROUSEL */}
			<Carousel defaultPokemons={defaultPokemons} />
			{/*  USER CLUE */}
			<div className="user-clue-1">
				<h2>Los pokemones que agregues comenzaran mostrarse aquí</h2>
				<TiArrowDownThick className="icon" />
			</div>
			{/*  CARDS */}
			<Cards />
		</div>
	)
}

export default Home
