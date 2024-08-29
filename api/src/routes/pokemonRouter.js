import { Router } from "express";

//* importando controladores
const { getAllPokemons } = require("../controllers/pokemonController.js");

const router = Router();

router.get("/"); //? FINALIZADO (devuelve 40 pokemones, "tipos" es un array de strings, NO crea relaciones y NO lo guarda en BD)
router.post("/"); //? FINALIZADO (crea un nuevo pokemon, devuelve el pokemon nuevo y SI LO GUARDA EN BD)
router.get("/:id"); //? FINALIZADO (tiene un params, devuelve el pokemon del id q busque y NO lo guarda en BD)
router.delete("/:nombre"); //? FINALIZADO (tiene un params, elimina al pokemon de la BD y devuelve todos los pokemones que quedan en la BD)

module.exports = router;
