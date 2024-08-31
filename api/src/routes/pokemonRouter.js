const { Router } = require("express");
const router = Router();

//* importando controladores
const {
	getAllPokemons,
	createPokemon,
	getPokemonById,
	getPokemonByName,
	deletePokemon
} = require("../controllers/pokemonController.js");

router.get("/", getAllPokemons); //? FINALIZADO (devuelve 40 pokemones, "tipos" es un array de strings, NO crea relaciones y NO lo guarda en BD)
router.post("/", createPokemon); //? FINALIZADO (crea un nuevo pokemon, devuelve el pokemon nuevo y SI LO GUARDA EN BD)
//* Esta ruta se usa para los Details (actualmente)
router.get("/:id", getPokemonById); //? FINALIZADO (tiene un params, devuelve el pokemon del id que busque y NO lo guarda en BD)
//* Para buscar a un pokemon por nombre (futuramente para details)
router.get("/:nombre", getPokemonByName); //? FINALIZADO (tiene el query: "name", devuelve le pokemon buscado y SI LO GUARDA EN BD)
router.delete("/:nombre", deletePokemon); //? FINALIZADO (tiene un params, elimina al pokemon de la BD y devuelve todos los pokemones que quedan en la BD)

module.exports = router;
