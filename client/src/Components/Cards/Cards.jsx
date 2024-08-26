import "./Cards.css";
import { useSelector, useDispatch } from "react-redux";
import {
	filterByOrigin,
	filterByType,
	orderByAlpha,
	orderByAttack
} from "../../Redux/Actions";
import Card from "../Card/Card";

const Cards = () => {
	//* pokemones guardados en redux
	const selectedPokemons = useSelector((state) => state.selectedPokemons);

	//* dispatch para enviar actions a redux
	const dispatch = useDispatch();

	//* Filtros y orden
	function handleAlphaOrder(event) {
		const { value } = event.target;
		dispatch(orderByAlpha(value));
	}

	function handleAttackOrder(event) {
		const { value } = event.target;
		dispatch(orderByAttack(value));
	}

	function handleTypeFilter(event) {
		const { value } = event.target;
		dispatch(filterByType(value));
	}

	function handleOriginFilter(event) {
		const { value } = event.target;
		dispatch(filterByOrigin(value));
	}

	//************************************* COMPONENTE CARDS**************************/
	return (
		<div className="cards">
			{/* FILTERS AND ORDER CONTAINERS */}
			{!selectedPokemons.length ? null : (
				<div className="filters-n-order-container">
					{/* Order alpha  */}
					<div className="alpha-order-container">
						<h3>Ordenar alfabeticamente</h3>
						<select name="alpha-order" onChange={handleAlphaOrder}>
							<option value="" disabled readOnly selected>
								(Escoge una opción)
							</option>
							<option value="default">Por defecto</option>
							<option value="A">Ascendente</option>
							<option value="D">Descendente</option>
						</select>
					</div>
					{/* Order attack  */}
					<div className="attack-order-container">
						<h3>Ordenar por ataque</h3>
						<select name="attack-order" onChange={handleAttackOrder}>
							<option value="" disabled readOnly selected>
								(Escoge una opción)
							</option>
							<option value="default">Por defecto</option>
							<option value="A">Ascendente</option>
							<option value="D">Descendente</option>
						</select>
					</div>
					{/* Type Filter  */}
					<div className="type-filter-container">
						<h3>Filtrar por tipo</h3>
						<select name="type-filter" onChange={handleTypeFilter}>
							<option value="" disabled readOnly selected>
								(Escoge una opción)
							</option>
							<option value="default">Por defecto</option>
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
							<option value="dragon">Dragon</option>
							<option value="dark">Dark</option>
							<option value="fairy">Fairy</option>
							<option value="unknown">Unknown</option>
							<option value="shadow">Shadow</option>
						</select>
					</div>
					{/* Origin filter */}
					<div className="origin-filter-container">
						<h3>Filtrar por origen</h3>
						<select name="origin-filter" onChange={handleOriginFilter}>
							<option value="" disabled readOnly selected>
								(Escoge una opción)
							</option>
							<option value="all">Todos</option>
							<option value="api">API</option>
							<option value="db">DB</option>
						</select>
					</div>
				</div>
			)}
			{/* CARDS CONTAINER */}
			{/* Mensaje si no hay pokemones y Cards de pokemons cuando sí haya */}
			{!selectedPokemons.length ? (
				<div className="no-pokemons">
					<h1>No tienes pokemones agregados!</h1>
					<img src="../../../../public/sad-pikachu.gif" alt="sad-pikachu" />
				</div>
			) : (
				<div className="yes-pokemons">
					{selectedPokemons.map((pokemon, index) => (
						<Card key={index + 1} pokemon={pokemon} />
					))}
				</div>
			)}
		</div>
	);
};

export default Cards;
