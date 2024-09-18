import "./SearchBar.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useState, useRef } from "react";

function SearchBar() {
	const [pokeName, setPokeName] = useState("");

	//* Para cachar el valor del input
	function handleChange(e) {
		const { value } = e.target;
		setPokeName(value);
	}

	const searchInput = useRef(null);

	//* Esta función hace 4 cosas
	//* 1) Evita ingresos nulos
	//* 2) Evita repetidos
	//* 3) Evita existentes
	//* 4) Si todo es correcto agrega un pokemon nuevo
	function handleClick(e) {
		e.preventDefault();

		if (!pokeName) return alert("No haz ingresado nada!");

		const pokeNameFix = pokeName.trim().toLowerCase();

		//! Evitar repetidos en el estado globlal de REDUX
		//! Recuerda que los pokemons en REDUX ya estan en POSTGRESQL
		const repeatedPokemon = selectedPokemons.find(
			(pokemon) => pokemon.nombre === pokeNameFix
		);
		if (repeatedPokemon) {
			if (document.getElementById("repeatedPoke") === null) {
				const repeatedPoke = document.createElement("div");
				repeatedPoke.id = "repeatedPoke";
				repeatedPoke.style.display = "none";
				document
					.querySelector("body")
					.insertAdjacentElement("afterend", repeatedPoke);
			}
			const repeatedPoke = document.getElementById("repeatedPoke");
			repeatedPoke.innerHTML = `
            <div>
              <p>Ya tienes a ese Pokemon agregado a tu colección!</p>
              <img src="../../../public/ash-y-pika.png" alt="repeated pokemon">
              <span class="clue">(Haz click en cualquier sitio para eliminar este mensaje)</span>
            </div>
          `;
			repeatedPoke.className = "error fade-in";
			repeatedPoke.style.display = "flex";

			document.getElementById("repeatedPoke").addEventListener("click", (e) => {
				if ("flex" === repeatedPoke.style.display) {
					repeatedPoke.className = "fade-out";

					setTimeout(() => {
						repeatedPoke.style.display = "none";
					}, 1000);
				}
			});
		} else {
			//* llamar a la action de getPokemonByName
			searchInput.current.value = "";
			setPokeName("");

			//! Por si el nombre del pokemon no existe en la API
			axios
				.get(`https://pokeapi.co/api/v2/pokemon/${pokeNameFix}`)
				.then(({ data }) => console.log("👍"))
				.catch((error) => {
					console.log("👎");

					if (document.getElementById("nonPokemon") === null) {
						const nonPokemon = document.createElement("div");
						nonPokemon.id = "nonPokemon";
						nonPokemon.style.display = "none";
						document
							.querySelector("body")
							.insertAdjacentElement("afterend", nonPokemon);
					}
					const nonPokemon = document.getElementById("nonPokemon");
					nonPokemon.innerHTML = `
            <div>
              <p>El nombre de ese Pokemon no fue encontrado!</p>
              <img src="../../../public/pika-sorprendido.png" alt="no pokemon">
              <span class="clue">(Haz click en cualquier sitio para eliminar este mensaje)</span>
            </div>
          `;
					nonPokemon.className = "error fade-in";
					nonPokemon.style.display = "flex";

					document
						.getElementById("nonPokemon")
						.addEventListener("click", (e) => {
							if ("flex" === nonPokemon.style.display) {
								nonPokemon.className = "fade-out";

								setTimeout(() => {
									nonPokemon.style.display = "none";
								}, 1000);
							}
						});
				});
		}
	}

	return (
		<div className="searchBar">
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
	);
}

export default SearchBar;
