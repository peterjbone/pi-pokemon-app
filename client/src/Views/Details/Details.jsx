import "./Details.css"
import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function Details() {
	const { id } = useParams()
	const URLGetPokemonById = "http://localhost:3001/pokemons/"
	const [currentPokemon, setCurrentPokemon] = useState({})

	//* Obteniendo el Pokemon al montar el componente
	useEffect(() => {
		async function getCurrentPokemon() {
			const { data } = await axios.get(`${URLGetPokemonById}${id}`)
			//console.log(data)
			setCurrentPokemon(data)
		}
		getCurrentPokemon()
	}, [id])

	return (
		<div className="details">
			<h1>Nombre: {currentPokemon.nombre}</h1>
			<img src={currentPokemon.imagen} alt={currentPokemon.nombre} />
		</div>
	)
}

export default Details
