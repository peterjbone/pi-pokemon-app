import "./SearchBar.css"
import axios from "axios"
import { FaSearch } from "react-icons/fa"
import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addPokemonByName } from "../../Redux/Actions"

function SearchBar() {
	const [pokeName, setPokeName] = useState("")
	const wrongPopupRef = useRef(null)
	const repeatedPopupRef = useRef(null)

	//* Para cachar el valor del input
	function handleChange(e) {
		const { value } = e.target
		setPokeName(value)
	}

	const selectedPokemons = useSelector((state) => state.selectedPokemons)
	const dispatch = useDispatch()
	const searchInput = useRef(null)

	//* Esta función hace 4 cosas
	//* 1) Evita ingresos nulos
	//* 2) Evita repetidos
	//* 3) Evita no existente
	//* 4) Si todo es correcto agrega un pokemon nuevo
	function handleClick(e) {
		e.preventDefault()

		if (!pokeName) return alert("No haz ingresado nada!")

		const pokeNameFix = pokeName.trim().toLowerCase()

		//! Evitar repetidos en el estado globlal de REDUX
		//! Recuerda que los pokemons en REDUX ya estan en POSTGRESQL
		const repeatedPokemon = selectedPokemons.find(
			(pokemon) => pokemon.nombre === pokeNameFix
		)
		if (repeatedPokemon) {
			repeatedPopupRef.current.classList.add("active")
		} else {
			dispatch(addPokemonByName(pokeNameFix))
			searchInput.current.value = ""
			setPokeName("")

			//! Por si el nombre del pokemon no existe en la API
			axios
				.get(`https://pokeapi.co/api/v2/pokemon/${pokeNameFix}`)
				.then(({ data }) => console.log("👍"))
				.catch((error) => {
					console.log("👎")
					wrongPopupRef.current.classList.add("active")
				})
		}
	}

	//* Cerrar los popups
	function closePopupWrong(e) {
		wrongPopupRef.current.classList.remove("active")
	}
	function closePopupRepeated(e) {
		repeatedPopupRef.current.classList.remove("active")
	}

	return (
		<div className="searchBar">
			<div className="wrong-popup" ref={wrongPopupRef}>
				<div>
					<button onClick={closePopupWrong}> ❌ </button>
					<p>
						EL NOMBRE INGRESADO <br /> NO PERTENECE A NINGUN POKEMON :&#41;
					</p>
				</div>
			</div>
			<div className="repeated-popup" ref={repeatedPopupRef}>
				<div>
					<button onClick={closePopupRepeated}> ❌ </button>
					<p>ESE POKEMON YA ESTA AÑADIDO!</p>
				</div>
			</div>
			<p>Aquí puedes buscar Pokemones por su nombre:</p>
			<input
				type="text"
				name="searchInput"
				placeholder="pikachu, bulbasaur, etc..."
				className="searchInput"
				onChange={handleChange}
				ref={searchInput}
				required
			/>
			<FaSearch className="searchIcon" onClick={handleClick} />
		</div>
	)
}

export default SearchBar
