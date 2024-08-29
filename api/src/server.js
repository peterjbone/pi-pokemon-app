const express = require("express");
const server = express();
const morgan = require("morgan");

//* Importando rutas
const rootRouter = require("./routes/rootRouter.js");
const pokemonRouter = require("./routes/pokemonRouter.js");

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

server.use(express.json());

server.use(morgan("dev"));

server.use("/", rootRouter);
server.use("/pokemons", pokemonRouter);

module.exports = server;
