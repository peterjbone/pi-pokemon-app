import styles from "./Cards.module.css";
import Card from "../Card/Card";
import { usePokemonStore } from "../../stores/pokemonStore.js";

const Cards = ({ pokemons, filterActivated, sortActivated }) => {
	//* actions
	const sortById = usePokemonStore((state) => state.sortById);
	const sortByName = usePokemonStore((state) => state.sortByName);
	const sortByAttack = usePokemonStore((state) => state.sortByAttack);
	const filterByType = usePokemonStore((state) => state.filterByType);
	const filterByGeneration = usePokemonStore(
		(state) => state.filterByGeneration
	);

	//* Sorts handlers
	function handleSortById(event) {
		const { value } = event.target;
		sortById(value);
	}

	function handleSortByName(event) {
		const { value } = event.target;
		sortByName(value);
	}

	function handleSortByAttack(event) {
		const { value } = event.target;
		sortByAttack(value);
	}

	//* Filters handlers
	function handleFilterByType(event) {
		const { value } = event.target;
		filterByType(value);
	}

	function handleFilterByGeneration(event) {
		const { value } = event.target;
		filterByGeneration(value);
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
							<select name="sortById" onChange={handleSortById}>
								<option value="" disabled readOnly selected>
									(choose an option)
								</option>
								<option value="A">Ascending (default)</option>
								<option value="D">Descending</option>
							</select>
						</div>
						{/* sort by name */}
						<div>
							<h3>Sort by name</h3>
							<select name="sortByName" onChange={handleSortByName}>
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
							<h3>Sort by attack</h3>
							<select name="sortByAttack" onChange={handleSortByAttack}>
								<option value="" disabled readOnly selected>
									(choose an option)
								</option>
								<option value="default">Default</option>
								<option value="A">Ascending</option>
								<option value="D">Descending</option>
							</select>
						</div>
					</div>
					{/***TYPES**/}
					<div className={styles.sortsContainer}>
						{/* Filter by type */}
						<div>
							<h3>Filter by type</h3>
							<select name="filterByType" onChange={handleFilterByType}>
								<option value="" disabled readOnly selected>
									(choose an option)
								</option>
								<option value="all">All</option>
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
					</div>
				</div>
			)}

			{/* CARDS CONTAINER */}
			{/* NO HAY POKEMONS: mensaje de error*/}
			{/* SI HAY POKEMONS: se muestran los pokemones*/}
			{!pokemons.length ? (
				<div className={styles.noPokemons}>
					<h1>There was an error to display the pokemons :(</h1>
					<img src="../../../../public/sad-pikachu.gif" alt="sad-pikachu" />
				</div>
			) : (
				<div className={styles.yesPokemons}>
					{pokemons.map((pokemon, index) => (
						<Card key={index + 1} pokemon={pokemon} />
					))}
				</div>
			)}

			{/* FILTER MESSAGE */}
			{filterActivated ? (
				<div className={styles.warning}>
					You cannot load more Pokemon while a filter is active. If you want
					more, disabled the filter and bring more pokemons.
				</div>
			) : null}

			{/* SORT MESSAGE */}
			{sortActivated ? (
				<div className={styles.warning}>
					You cannot load more Pokemon while a sort is active. If you want more,
					disabled the sort and bring more pokemons.
				</div>
			) : null}
		</div>
	);
};

export default Cards;
