import "./CardOne.css"
import { Link } from "react-router-dom"

function CardOne({ pokemon }) {
	const { id, nombre, tipos, imagen } = pokemon

	return (
		<div className="card one">
			<Link to={`/details/${id}`}>
				<h3>{nombre.toUpperCase()}</h3>
				<img src={imagen} alt={nombre} />
				<h4>Pokemon tipo:</h4>
				<ul>
					{tipos.map((tipo, index) => {
						return <li key={index + 1}> {tipo} </li>
					})}
				</ul>
			</Link>
		</div>
	)
}

export default CardOne
