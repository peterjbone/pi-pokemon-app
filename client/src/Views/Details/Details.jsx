import styles from "./Details.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const { VITE_BACK_URL } = import.meta.env;
//const apiBackUrl = VITE_BACK_URL;
const apiBackUrl = "https://pokemon-hw8c.onrender.com";
import { v4 as uuidv4 } from "uuid";

function Details() {
	const { name } = useParams();
	const [pokemon, setPokemon] = useState({});

	//* Obteniendo el Pokemon con el nombre
	useEffect(() => {
		async function getPokemonByName() {
			const { data } = await axios.get(`${apiBackUrl}/pokename?name=${name}`);
			setPokemon(data);
		}
		getPokemonByName();
	}, []);

	//******************************* DETAILS COMPONENT
	return (
		<div className={styles.details}>
			<div className="neon-border">
				<img src={pokemon.imagen} alt={pokemon.nombre} />
			</div>
			<div>
				<h1>
					{" "}
					<span className="property">Nombre:</span> {pokemon.nombre}
				</h1>
				<h2>
					<span className="property">ID #:</span> {pokemon.idApi}
				</h2>
				<h2>
					<span className="property">Vida: </span>
					{pokemon.vida}
				</h2>
				<h2>
					<span className="property">Ataque: </span>
					{pokemon.ataque}
				</h2>
				<h2>
					<span className="property">Defensa: </span>
					{pokemon.defensa}
				</h2>
				{pokemon.velocidad ? (
					<h2>
						<span className="property">Velocidad: </span>
						{pokemon.velocidad}{" "}
					</h2>
				) : null}
				{pokemon.altura ? (
					<h2>
						{" "}
						<span className="property">Altura: </span>
						{pokemon.altura}{" "}
					</h2>
				) : null}
				{pokemon.peso ? (
					<h2>
						{" "}
						<span className="property">Peso: </span>
						{pokemon.peso}{" "}
					</h2>
				) : null}

				{pokemon.types ? (
					<>
						<h2>
							{" "}
							<span className="property">Tipo/s:</span>
						</h2>
						<ul>
							{pokemon.types.map((type) => (
								<li key={uuidv4()}> {type.nombre} </li>
							))}
						</ul>
					</>
				) : null}
			</div>
		</div>
	);
}

export default Details;
