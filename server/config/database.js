const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MONGO_DB Connection is not provided");
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db("Vaperasoy");

// Default value for role is 'user'
const defaultUserRole = "user";
const imageUrl = "https://cdn-icons-png.flaticon.com/512/266/266033.png";

// Define a function to insert a new user with default role
async function insertUserWithDefaultRole(user) {
  const defaultUser = { ...user, role: defaultUserRole, imgUrl: imageUrl };
  const result = await db.collection("Users").insertOne(defaultUser);
  return result;
}

module.exports = {
  db,
  insertUserWithDefaultRole,
};
