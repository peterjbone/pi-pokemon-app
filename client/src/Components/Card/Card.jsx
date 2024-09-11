import styles from "./Card.module.css";
import { Link } from "react-router-dom";

function Card({ pokemon }) {
	const { nombre, ataque, imagen, Types } = pokemon;
	return (
		<div className={styles.card}>
			<button>X</button>
			<Link to={`/details/${nombre}`}>
				<h3>{nombre.toUpperCase()}</h3>
				<p> Ataque: {ataque} </p>
				<img src={imagen} alt={nombre} />
				<h4>Pokemon tipo:</h4>
				<ul>
					{Types.map((type, index) => {
						return <li key={index + 1}> {type.nombre} </li>;
					})}
				</ul>
			</Link>
		</div>
	);
}

export default Card;
