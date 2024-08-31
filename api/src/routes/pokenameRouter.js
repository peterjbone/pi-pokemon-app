const { Router } = require("express");
const router = Router();

const { getPokemonByName } = require("../controllers/pokenameController.js");

//* Para buscar a un pokemon por nombre (futuramente para details)
//* caso 1: usuario lo busca por barra de busqueda
//* caso 2: usuario hace click en una card de pokemon
router.get("/", getPokemonByName); //? FINALIZADO (tiene el query: "name", devuelve le pokemon buscado y SI LO GUARDA EN BD)

module.exports = router;
