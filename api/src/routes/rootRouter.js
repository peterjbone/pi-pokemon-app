const { Router } = require("express");
const rootRouter = Router();

//* Importar los controladores de rootRouter
const getAllTypes = require("./controllers/getAllTypes.js");
const getAllPokemons = require("./controllers/getAllPokemons.js");
const getPokemonById = require("./controllers/getPokemonById.js");
const getPokemonByName = require("./controllers/getPokemonByName.js");
const createPokemon = require("./controllers/createPokemon.js");
const deletePokemon = require("./controllers/deletePokemon.js");

//* Manejar las peticiones HTTP
rootRouter.get("/types", getAllTypes); //? FINALIZADO (busca en la API, devuelve los tipos y los guarda en BD)

rootRouter.get("/pokemons", getAllPokemons); //? FINALIZADO (devuelve 40 pokemones, hace las relaciones de tipos, tipos es un array de strings y NO guarda en BD)
rootRouter.post("/pokemons", createPokemon); //? FINALIZADO (crea un nuevo pokemon, devuelve el pokemon nuevo y lo guarda en BD)
rootRouter.get("/pokemons/:id", getPokemonById); //? FINALIZADO (tiene un params, devuelve el pokemon del id q busque y NO guardar en BD)
rootRouter.delete("/pokemons/:nombre", deletePokemon); //? FINALIZADO (tiene un params, devuelve todos los pokemones que quedan en la BD)

rootRouter.get("/pokename", getPokemonByName); //? FINALIZADO (tiene el query: "name", devuelve le pokemon buscado y LO GUARDA EN BD)

const fullPokemons = require("./controllers/fullPokemons.js");
rootRouter.get("/fullpokemons", fullPokemons); //? FINALIZADO (devuelve 40 pokemones, FALSEA las relaciones de tipos, tipos es un array de objetos y NO guarda en BD)

module.exports = rootRouter;
