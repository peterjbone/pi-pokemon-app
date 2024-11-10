import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Card({ pokemon }) {
	const { idApi, nombre, ataque, imagen, types } = pokemon;
	return (
		<div className={styles.card}>
			<Link to={`/details/${nombre}`}>
				<h3>{nombre.toUpperCase()}</h3>
				<p>ID # {idApi} </p>
				<img src={imagen} alt={nombre} />
				<p>Attack: {ataque} </p>
				<h4>Types: </h4>
				<ul>
					{types.map((item) => (
						<li key={uuidv4()}> {item.nombre} </li>
					))}
				</ul>
			</Link>
		</div>
	);
}

export default Card;
