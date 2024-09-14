import styles from "./Cards.module.css";
import Card from "../Card/Card";
import { usePokemonStore } from "../../stores/pokemonStore.js";

const Cards = ({ pokemons }) => {
	const sortByName = usePokemonStore((state) => state.sortByName);

	//* Sorts functions
	function handleSortByName(event) {
		const { value } = event.target;
		sortByName(value);
	}

	function handleAttackOrder(event) {
		const { value } = event.target;
	}

	//* Filters functions
	function handleTypeFilter(event) {
		const { value } = event.target;
	}

	//************************************* COMPONENTE CARDS **************************/
	return (
		<div className={styles.cards}>
			{/* FILTERS AND ORDER CONTAINERS */}
			{/* NO HAY POKEMONS: no se muestra nada*/}
			{/* SI HAY POKEMONS: se muestran los filtros*/}
			{!pokemons.length ? null : (
				<div className={styles.filtersAndSortsUpperContainer}>
					{/***SORTS**/}
					<div className={styles.filtersContainer}>
						{/* sort by ID  */}
						<div>
							<h3>Sort by ID</h3>
							<select name="id-sort" onChange={() => {}}>
								<option value="" disabled readOnly selected>
									(choose an option)
								</option>
								<option value="A">Ascending</option>
								<option value="D">Descending</option>
							</select>
						</div>
						{/* sort by name */}
						<div>
							<h3>Sort by name</h3>
							<select name="name-sort" onChange={handleSortByName}>
								<option value="" disabled readOnly selected>
									(choose an option)
								</option>
								<option value="default">Default</option>
								<option value="A">Ascending</option>
								<option value="D">Descending</option>
							</select>
						</div>
						{/* sort by attack  */}
						<div>
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
					</div>

					{/***TYPES**/}
					<div className={styles.sortsContainer}>
						{/* Type Filter  */}
						<div>
							<h3>Filter by type</h3>
							<select name="type-filter" onChange={handleTypeFilter}>
								<option value="" disabled readOnly selected>
									(choose an option)
								</option>
								<option value="default">All</option>
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
						{/* Generation Filter  */}
						<div>
							<h3>Filter by generation</h3>
							<select name="generation-filter" onChange={() => {}}>
								<option value="" disabled readOnly selected>
									(choose an option)
								</option>
								<option value="all">All</option>
								<option value="generation-one">Generation I</option>
								<option value="generation-two">Generation II</option>
								<option value="generation-three">Generation III</option>
								<option value="generation-four">Generation IV</option>
							</select>
						</div>
					</div>
				</div>
			)}

			{/* CARDS CONTAINER */}
			{/* NO HAY POKEMONS: mensaje de error*/}
			{/* SI HAY POKEMONS: se muestran los pokemones*/}
			{!pokemons.length ? (
				<div className={styles.noPokemons}>
					<h1>Hubo un error al mostrar a los pokemons :(</h1>
					<img src="../../../../public/sad-pikachu.gif" alt="sad-pikachu" />
				</div>
			) : (
				<div className={styles.yesPokemons}>
					{pokemons.map((pokemon, index) => (
						<Card key={index + 1} pokemon={pokemon} />
					))}
				</div>
			)}
		</div>
	);
};

export default Cards;
