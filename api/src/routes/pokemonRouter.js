const { Router } = require("express");
const router = Router();

//* importando controladores
const {
	getAllPokemons,
	createPokemon,
	deletePokemon
} = require("../controllers/pokemonController.js");

router.get("/", getAllPokemons); //? FINALIZADO (devuelve 40 pokemones, SI crea relaciones con "Types" y SI guarda a los pokemones en BD)

router.post("/", createPokemon); //? FINALIZADO (crea un nuevo pokemon, devuelve el pokemon nuevo y SI LO GUARDA EN BD)

router.delete("/:nombre", deletePokemon); //? FINALIZADO (tiene un params, elimina al pokemon de la BD y devuelve todos los pokemones que quedan en la BD)

module.exports = router;
