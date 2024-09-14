import styles from "./Details.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const { VITE_BACKEND_URL } = import.meta.env;

function Details() {
	const { name } = useParams();
	const [currentPokemon, setCurrentPokemon] = useState({});

	//* Obteniendo el Pokemon con el nombre
	useEffect(() => {
		async function getPokemonByName() {
			const { data } = await axios.get(
				`${VITE_BACKEND_URL}/pokename?name=${name}`
			);
			console.log(data);
			setCurrentPokemon(data);
		}
		getPokemonByName();

		return () => {
			setCurrentPokemon(null);
		};
	}, [name]);

	//******************************* COMPONENTE DETAILS
	return (
		<div className={styles.details}>
			<div className="neon-border">
				<img src={currentPokemon.imagen} alt={currentPokemon.nombre} />
			</div>
			<div>
				<h1>
					{" "}
					<span className="property">Nombre:</span> {currentPokemon.nombre}
				</h1>
				<h2>
					<span className="property">ID #:</span> {currentPokemon.idApi}
				</h2>
				<h2>
					<span className="property">Vida: </span>
					{currentPokemon.vida}
				</h2>
				<h2>
					<span className="property">Ataque: </span>
					{currentPokemon.ataque}
				</h2>
				<h2>
					<span className="property">Defensa: </span>
					{currentPokemon.defensa}
				</h2>
				{currentPokemon.velocidad ? (
					<h2>
						<span className="property">Velocidad: </span>
						{currentPokemon.velocidad}{" "}
					</h2>
				) : null}
				{currentPokemon.altura ? (
					<h2>
						{" "}
						<span className="property">Altura: </span>
						{currentPokemon.altura}{" "}
					</h2>
				) : null}
				{currentPokemon.peso ? (
					<h2>
						{" "}
						<span className="property">Peso: </span>
						{currentPokemon.peso}{" "}
					</h2>
				) : null}

				{currentPokemon.Types ? (
					<>
						<h2>
							{" "}
							<span className="property">Tipo/s:</span>
						</h2>
						<ul>
							{currentPokemon.Types.map((type, index) => (
								<li key={index}> {type.nombre} </li>
							))}
						</ul>
					</>
				) : null}
			</div>
		</div>
	);
}

export default Details;
