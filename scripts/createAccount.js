const mongoose = require("mongoose");
const fs = require("fs");
const functions = require("../structs/functions.js");

const config = JSON.parse(fs.readFileSync("./Config/config.json").toString());
const mongoUri = process.env.MONGODB_URI || config.mongodb.database;

const [,, email, username, password] = process.argv;

if (!email || !username || !password) {
    console.log("Usage: node scripts/createAccount.js <email> <username> <password>");
    process.exit(1);
}

mongoose.connect(mongoUri, async () => {
    const discordId = `cli_${Date.now()}`;
    const result = await functions.registerUser(discordId, username, email, password);
    console.log(result.message);
    await mongoose.disconnect();
    process.exit(result.status >= 400 ? 1 : 0);
});
