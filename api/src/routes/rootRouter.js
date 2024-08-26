const { Router } = require("express");
const rootRouter = Router();

//* Importar los controladores de rootRouter
const getAllTypes = require("./controllers/getAllTypes.js");
const getAllPokemons = require("./controllers/getAllPokemons.js");
const getPokemonById = require("./controllers/getPokemonById.js");
const getPokemonByName = require("./controllers/getPokemonByName.js");
const createPokemon = require("./controllers/createPokemon.js");
const deletePokemon = require("./controllers/deletePokemon.js");
const fullPokemons = require("./controllers/fullPokemons.js");

//* Manejar las peticiones HTTP
rootRouter.get("/types", getAllTypes); //? FINALIZADO
rootRouter.get("/pokemons", getAllPokemons); //? FINALIZADO
rootRouter.get("/pokemons/:id", getPokemonById); //? FINALIZADO (me devuelve el pokemon nuevo)
rootRouter.get("/pokename", getPokemonByName); //? FINALIZADO (me devuelve el pokemon nuevo)
rootRouter.post("/pokemons", createPokemon); //? FINALIZADO (me devuelve el pokemon nuevo)
rootRouter.delete("/pokemons/:nombre", deletePokemon); //? FINALIZADO (me devuelve todos los pokemones que quedan en la BD)

rootRouter.get("/fullpokemons", fullPokemons);

module.exports = rootRouter;
