const express = require("express")
const server = express()
const morgan = require("morgan")
const routes = require("./routes/index.js")

server.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:3001")
	res.header("Access-Control-Allow-Credentials", "true")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	)
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
	next()
})

server.use(morgan("dev"))

server.use("/", routes)

module.exports = server
