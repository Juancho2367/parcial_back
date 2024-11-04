const { MongoClient } = require('mongodb');

let db;

async function connectDb() {
    try {
        const client = new MongoClient(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if (!db) {
            await client.connect();
            db = client.db(process.env.test); // Conecta con el nombre de tu base de datos
            console.log("Conexión exitosa a la base de datos");
        }
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        throw error;
    }
}

function getDb() {
    if (!db) {
        throw new Error('La base de datos no está inicializada');
    }
    return db;
}

module.exports = { connectDb, getDb };
