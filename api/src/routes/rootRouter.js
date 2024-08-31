const { Router } = require("express");
const rootRouter = Router();

const getPokemonByName = require("./controllers/getPokemonByName.js");

rootRouter.get("/pokename", getPokemonByName); //? FINALIZADO (tiene el query: "name", devuelve le pokemon buscado y SI LO GUARDA EN BD)

module.exports = rootRouter;
