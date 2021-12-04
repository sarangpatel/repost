'use strict';
process.env.MONGODB_URI = 'mongodb://emopinadmin:yz74g94bra@3.109.94.254:27017/emopin';
process.env.MONGODB_NAME = 'emopin';



const MongoClient = require('mongodb').MongoClient;
const MongoDBURI = process.env.MONGODB_URI;
const MongoDBName = process.env.MONGODB_NAME

const client = new MongoClient(MongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 1000,
    socketTimeoutMS: 1000,
});
let db;
let connect = async () => {
    try{
        await client.connect();
        db = client.db(MongoDBName);
        await client.db(MongoDBName).command({ ping: 1 });
        console.log("Connected successfully to server");        
    }catch(e){
        console.log('Error in connection', e.message);
    }
};


//password: md5(test@123)
let createUserCollection = async (collName) => {
    try{
        await connect();
        const doc = {
            full_name: "Sarang Patel",
            username: "+918454049404",
            password: "ceb6c970658f31504a901b89dcd3e461",
            country_code: "+91",
            mobile_no: "8454049404",
            email: null,
            timezone: null,
            is_otp_verified: 0,
            app_version: null,
            device_id: null,
            status:'ACTIVE', //enum
            created_at: "2021-12-04 11:11:21",
            last_modified_at: "2021-12-04 11:11:21",
            modified_count: 0
        }
        await db.createCollection( "users");
        db.collection('users').createIndex( { "username": 1 }, { unique: true } );
        db.collection('users').createIndex( { "username": 1, "password": 1  } );
        db.collection('users').createIndex( { status: 1  } );
        await db.collection('users').insertOne(doc);
        console.log('Users collection created successfully.');
    }catch(e){
        console.log('Error on creating users collections:', e.message);
    }finally{
       await client.close();
       console.log('Connection closed.');
    }
}
let collections = [createUserCollection];
for(let i = 0 ; i < collections.length; i++){
    collections[i]();
}
