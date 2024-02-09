//* No necesita interacción con el back
//? -----NO route y NO controller del server
//? -----NO respuesta afirmativa o negativa del server

//* Formulario controlado
//* Las validaciones de API y de regex hazlas en validation.js
//* Validar que NO sea un POKEMON-CANON
//* Importar una funcion validadora
//* SI todo esta correcto, se puede hacer el dispatch
//* Recuerda que por cada pokemon puede ingresar hasta 3 tipos

import "./FormPokemon.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addPokemonByBody } from "../../Redux/Actions"
import validation from "./validation.js"

function FormPokemon() {
	//* Estados locales para pokedata y errores
	const [pokedata, setPokedata] = useState({
		nombre: "",
		imagen: "",
		vida: "",
		ataque: "",
		defensa: "",
		Types: [],
		source: "database",
		// opcionales
		velocidad: "",
		altura: "",
		peso: ""
	})
	const [errors, setErrors] = useState({
		nombre: "Ingrese un nombre",
		imagen: "Ingrese la URL de la imagen",
		vida: "Ingrese puntos de vida",
		ataque: "Ingrese puntos de ataque",
		defensa: "Ingrese puntos de defensa",
		Types: "Seleccione los tipos de pokemon",
		// opcionales
		velocidad: "",
		altura: "",
		peso: ""
	})

	function handleChange(event) {
		const { name, value } = event.target

		if (name === "Types") {
			//* Para los cambios en Types

			const previousValues = pokedata.Types.filter((tipo) => tipo !== value) //? no se repite el ultimo agregado

			const repeatedValue = pokedata.Types.indexOf(value) //? evita meter repetidos

			if (repeatedValue !== -1) {
				setPokedata({
					...pokedata,
					Types: [...previousValues]
				})
				setErrors(
					validation({
						...pokedata,
						Types: [...previousValues]
					})
				)
			}

			setPokedata({
				...pokedata,
				Types: [value, ...previousValues]
			})
			setErrors(
				validation({
					...pokedata,
					Types: [value, ...previousValues]
				})
			)
		} else {
			//* Para los cambios en cualquier otra propiedad
			setPokedata({
				...pokedata,
				[name]: value
			})
			setErrors(
				validation({
					...pokedata,
					[name]: value
				})
			)
		}
	}
	console.log(pokedata)
	console.log(errors)

	//* El dispatch
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const selectedPokemons = useSelector((state) => state.selectedPokemons)

	function handleSubmit(event) {
		event.preventDefault()

		const repeatedPokemon = selectedPokemons.find(
			(pokemon) => pokemon.nombre === pokedata.nombre.trim().toLowerCase()
		)

		if (repeatedPokemon) {
			window.alert("Ese pokemon ya existe en tu colección!")
		} else {
			dispatch(addPokemonByBody(pokedata))
			navigate("/home")
		}
	}

	return (
		<div className="formPokemon">
			<h1>Crea tu propio Pokemon</h1>
			<h3>
				Una vez creado, el pokemon aparecera en la página principal <br /> junto a
				los demas pokemones.
			</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="nombre">Nombre:</label>
					<input
						key="nombre"
						type="text"
						id="nombre"
						name="nombre"
						value={pokedata.nombre}
						className="classic-input"
						onChange={handleChange}
					/>
					<p className="warning">{errors.nombre && errors.nombre}</p>
				</div>
				<div className="form-group">
					<label htmlFor="imagen">URL de la imagen:</label>
					<input
						key="imagen"
						type="text"
						id="imagen"
						name="imagen"
						value={pokedata.imagen}
						className="classic-input"
						onChange={handleChange}
					/>
					<p className="warning">{errors.imagen && errors.imagen}</p>
				</div>
				<div className="form-group">
					<label htmlFor="vida">Puntos de vida:</label>
					<input
						key="vida"
						type="text"
						id="vida"
						name="vida"
						value={pokedata.vida}
						className="classic-input"
						onChange={handleChange}
					/>
					<p className="warning">{errors.vida && errors.vida}</p>
				</div>
				<div className="form-group">
					<label htmlFor="ataque">Puntos de ataque:</label>
					<input
						key="ataque"
						type="text"
						id="ataque"
						name="ataque"
						value={pokedata.ataque}
						className="classic-input"
						onChange={handleChange}
					/>
					<p className="warning">{errors.ataque && errors.ataque}</p>
				</div>
				<div className="form-group">
					<label htmlFor="defensa">Puntos de defensa:</label>
					<input
						key="defensa"
						type="text"
						id="defensa"
						name="defensa"
						value={pokedata.defensa}
						className="classic-input"
						onChange={handleChange}
					/>
					<p className="warning">{errors.defensa && errors.defensa}</p>
				</div>
				<div className="form-group">
					<label htmlFor="velocidad">
						Velocidad<span className="clue">(opcional)</span>
					</label>
					<input
						key="velocidad"
						type="text"
						id="velocidad"
						name="velocidad"
						value={pokedata.velocidad}
						className="classic-input"
						onChange={handleChange}
					/>
					<p className="advices">{errors.velocidad && errors.velocidad}</p>
				</div>
				<div className="form-group">
					<label htmlFor="altura">
						Altura en pies - 1 pie = 0.3 metros{" "}
						<span className="clue">(opcional)</span>
					</label>
					<input
						key="altura"
						type="text"
						id="altura"
						placeholder="Puedes usar números decimales"
						name="altura"
						value={pokedata.altura}
						className="classic-input"
						onChange={handleChange}
					/>
					<p className="advices">{errors.altura && errors.altura}</p>
				</div>
				<div className="form-group">
					<label htmlFor="peso">
						Peso en libras - 1 libra = 0.4 kilos{" "}
						<span className="clue">(opcional)</span>
					</label>
					<input
						type="text"
						id="peso"
						placeholder="Puedes usar números decimales"
						name="peso"
						value={pokedata.peso}
						className="classic-input"
						onChange={handleChange}
					/>
					<p className="advices">{errors.peso && errors.peso}</p>
				</div>
				<div className="form-group">
					<p>Seleccione los tipos a los que pertenece el Pokemon: </p>
					<select
						key="Types"
						name="Types"
						id="Types"
						className="select-input"
						multiple
						size="10"
						value={pokedata.Types}
						onChange={handleChange}>
						<option
							value=""
							disabled
							readOnly
							selected
							style={{ color: "#fff", backgroundColor: "#555" }}>
							(Seleccione una opción)
						</option>
						<option value="normal">Normal</option>
						<option value="fighting">Fighting</option>
						<option value="flying">Flying</option>
						<option value="poison">Poison</option>
						<option value="ground">Ground</option>
						<option value="rock">Rock</option>
						<option value="bug">Bug</option>
						<option value="ghost">Ghost</option>
						<option value="steel">Steel</option>
						<option value="fire">Fire</option>
						<option value="water">Water</option>
						<option value="grass">Grass</option>
						<option value="electric">Electric</option>
						<option value="psychic">Psychic</option>
						<option value="ice">Ice</option>
						<option value="dragon">dragon</option>
						<option value="dark">dark</option>
						<option value="fairy">Fairy</option>
						<option value="unknown">Unknown</option>
						<option value="shadow">Shadow</option>
					</select>
					<p className="warning">{errors.Types && errors.Types} </p>
				</div>
				<button
					type="submit"
					disabled={
						!errors.nombre &&
						!errors.imagen &&
						!errors.vida &&
						!errors.ataque &&
						!errors.defensa &&
						!errors.Types &&
						!errors.velocidad &&
						!errors.altura &&
						!errors.peso
							? false
							: true
					}
					className={
						errors.nombre ||
						errors.imagen ||
						errors.vida ||
						errors.ataque ||
						errors.defensa ||
						errors.Types ||
						errors.velocidad ||
						errors.altura ||
						errors.peso
							? "disabled"
							: ""
					}>
					Enviar
				</button>
			</form>
		</div>
	)
}

export default FormPokemon
