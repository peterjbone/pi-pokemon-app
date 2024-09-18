const { Router } = require("express");
const router = Router();

//* importando controladores
const { getAllPokemons } = require("../controllers/pokemonController.js");

router.get("/", getAllPokemons); //? FINALIZADO y tiene la query de offset (devuelve 40 pokemones, SI crea relaciones con "Types" y SI guarda a los pokemones en BD)

module.exports = router;
