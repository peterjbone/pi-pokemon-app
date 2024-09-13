import styles from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ pokemon }) {
	const { idApi, nombre, ataque, imagen, Types } = pokemon;
	return (
		<div className={styles.card}>
			<Link to={`/details/${nombre}`}>
				<h3>{nombre.toUpperCase()}</h3>
				<p>ID (api): {idApi} </p>
				<img src={imagen} alt={nombre} />
				<p>Attack: {ataque} </p>
				<h4>Types: </h4>
				<ul>
					{Types.map((type, index) => (
						<li key={index + 1}> {type.nombre} </li>
					))}
				</ul>
			</Link>
		</div>
	);
}

export default Card;
