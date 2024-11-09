require("dotenv").config();
const { connect } = require("mongoose");

if (!process.env.MONGODB_URL_LOCAL) {
	throw new Error("MONGODB_URL must be define.");
}

const connectDB = async () => {
	try {
		await connect(process.env.MONGODB_URL_LOCAL);
		console.log("Connection established with the database!");
	} catch (error) {
		console.log("Error connecting to database", error);
	}
};

//importing models

module.exports = { connectDB };
