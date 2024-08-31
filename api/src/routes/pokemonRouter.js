const { Router } = require("express");

//* importando controladores
const {
	getAllPokemons,
	createPokemon,
	getPokemonById,
	deletePokemon
} = require("../controllers/pokemonController.js");

const router = Router();

router.get("/", getAllPokemons); //? FINALIZADO (devuelve 40 pokemones, "tipos" es un array de strings, NO crea relaciones y NO lo guarda en BD)
router.post("/", createPokemon); //? FINALIZADO (crea un nuevo pokemon, devuelve el pokemon nuevo y SI LO GUARDA EN BD)
//* Esta ruta se usa para los Details
router.get("/:id", getPokemonById); //? FINALIZADO (tiene un params, devuelve el pokemon del id que busque y NO lo guarda en BD)
//* Para buscar a un pokemon por nombre
router.get("/:nombre");
router.delete("/:nombre", deletePokemon); //? FINALIZADO (tiene un params, elimina al pokemon de la BD y devuelve todos los pokemones que quedan en la BD)

module.exports = router;
