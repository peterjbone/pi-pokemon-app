//* setting up the server and synchronizing with the DB

const server = require("./server.js");
const PORT = 3001;
const { sqlz } = require("./db.js");

server.listen(PORT, async () => {
	try {
		await sqlz.sync({ force: false });
		console.log(`Connection established :D and Server raised on port: ${PORT}`);
	} catch (error) {
		console.error(`Unable to connect to the database: `, error.message);
	}
});
