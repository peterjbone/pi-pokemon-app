const server = require("./server.js");
const PORT = process.env.PORT || 3001;
const { connectDB } = require("./mongodb.js");

//* raising the server and connecting the DB
server.listen(PORT, async () => {
	try {
		console.log(`Server raised at port: ${PORT}`);
		await connectDB();
	} catch (error) {
		console.log(error);
	}
});
