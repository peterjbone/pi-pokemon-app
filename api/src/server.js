const express = require("express");
const server = express();
const morgan = require("morgan");

//* Importando rutas
const pokemonRouter = require("./routes/pokemonRouter.js");
const typeRouter = require("./routes/typeRouter.js");
const pokenameRouter = require("./routes/pokenameRouter.js");

//* Middlewares generales
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

//* Middlewares de rutas
server.get("/", (req, res) => {
	return res.status(200).send("Hello there, the root route is working!");
});
server.use("/pokemons", pokemonRouter);
server.use("/types", typeRouter);
server.use("/pokename", pokenameRouter);

module.exports = server;
