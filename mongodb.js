const MongoClient = require('mongodb').MongoClient;
const MongoDBURI = process.env.MONGODB_URI;
const MongoDBName = process.env.MONGODB_NAME
const client = new MongoClient(MongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000,
    socketTimeoutMS: 60000,
});

/**
 * Create connection to Mongodb
 */
async function createConnection() {
    console.log("Inside MongoDB createConnection.");
    try{
        await client.connect();
        return client.db(MongoDBName);
    } catch (error){
        console.log('Error in connecting to Mongodb: ', error);
        throw new Error(error.message);
    }
} 

async function closeConnection() {
    console.log("Inside MongoDB closeConnection.");
    try{
        if(client.isConnected()){
            await client.close();
            console.log('Mongo Connection closed.');
        }
    }catch(error){
        console.log('Error in closing connection to Mongodb: ', error.message);
    }
}

exports.createConnection = createConnection;

exports.closeConnection = closeConnection;

exports.findOne = async (collName, query={}, options= {}) => {
    console.log("Inside MongoDB findOne.");
	try {
		let db = await createConnection();
        return await db.collection(collName).findOne(query,options);
	} catch (error) {
			console.log("Inside MongoDB findOne - Error in getting find one", error.message);
			throw new Error(error.message);
	} finally {
        console.log("Inside MongoDB findOne ==> Finally.");
        await closeConnection();
        console.log("Inside MongoDB findOne ==> Finally => Connection closed.");
    }
}