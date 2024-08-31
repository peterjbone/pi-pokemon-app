const { Router } = require("express");
const rootRouter = Router();

//const getAllTypes = require("./controllers/getAllTypes.js");
const getPokemonByName = require("./controllers/getPokemonByName.js");
const fullPokemons = require("./controllers/fullPokemons.js");

//rootRouter.get("/types", getAllTypes);
rootRouter.get("/pokename", getPokemonByName); //? FINALIZADO (tiene el query: "name", devuelve le pokemon buscado y SI LO GUARDA EN BD)
rootRouter.get("/fullpokemons", fullPokemons); //? FINALIZADO (devuelve 40 pokemones, FALSEA las relaciones de tipos, tipos es un array de objetos y NO guarda en BD)

module.exports = rootRouter;
