import "./Details.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Details() {
	const { id } = useParams();
	const URLGetPokemonById = "http://localhost:3001/pokemons/";
	const [currentPokemon, setCurrentPokemon] = useState({});

	//* Obteniendo el Pokemon al montar el componente
	useEffect(() => {
		async function getCurrentPokemon() {
			const { data } = await axios.get(`${URLGetPokemonById}${id}`);
			setCurrentPokemon(data);
		}
		getCurrentPokemon();
	}, [id]);

	return (
		<div className="details">
			<div className="neon-border">
				<img src={currentPokemon.imagen} alt={currentPokemon.nombre} />
			</div>
			<div>
				<h1>
					{" "}
					<span className="property">Nombre:</span> {currentPokemon.nombre}
				</h1>
				<h2>
					<span className="property">ID:</span> {currentPokemon.id}
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
