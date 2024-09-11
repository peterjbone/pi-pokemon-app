import styles from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ pokemon }) {
	const { id, nombre, ataque, imagen, Types } = pokemon;
	return (
		<div className={styles.card}>
			<Link to={`/details/${nombre}`}>
				<h3>{nombre.toUpperCase()}</h3>
				<img src={imagen} alt={nombre} />
				<p>Attack: {ataque} </p>
				<h4>Types: </h4>
				{console.log(Types)}
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
