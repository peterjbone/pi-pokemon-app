import "./CardTwo.css"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deletePokemon } from "../../Redux/Actions"

function CardTwo({ pokemon }) {
	const { id, nombre, ataque, imagen, Types } = pokemon

	//* Dispatch para eliminar al pokemon actual de REDUX y POSTGRESQL
	const dispatch = useDispatch()
	function closeCard(e) {
		e.preventDefault()
		dispatch(deletePokemon(nombre))
	}

	return (
		<div className="card two">
			<button onClick={closeCard}>X</button>
			<Link to={`/details/${id}`}>
				<h3>{nombre.toUpperCase()}</h3>
				<p> Ataque: {ataque} </p>
				<img src={imagen} alt={nombre} />
				<h4>Pokemon tipo:</h4>
				<ul>
					{Types.map((type, index) => {
						return <li key={index + 1}> {type.nombre} </li>
					})}
				</ul>
			</Link>
		</div>
	)
}

export default CardTwo
