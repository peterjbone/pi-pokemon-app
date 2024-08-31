const { Router } = require("express");
const router = Router();

const { getAllTypes } = require("../controllers/typeController.js");

router.get("/", getAllTypes); //? FINALIZADO (busca en la API, devuelve los tipos y SI los guarda en BD)

module.exports = router;
