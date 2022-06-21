//Mongoose is a library used with mongo
const mongoose = require('mongoose');

//Const to make it immutable, and db to make it short
const db = mongoose.connection;

function connect (user, password, host, port, db) {
    //Probably shouldn't attach user and password here
    // const connectionString = `mongodb://{user}:{password}@{host}:{port}//{database}`;
    const connectionString = `mongodb+srv://keatonbrinkerhoff:keatonbrinkerhoff@cluster0.tdfgs.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.connect(connectionString, {
        //Always add these settings
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

//Functions that happen at different stages of attaching to mongodb
function setUpConnectionHandlers(callback) {
    //What should happen when connecting to mongoose
    db.once("connecting", () =>{
        console.log("Connecting to Mongoose");
    });
    //What should happen when connected to mongoose
    db.once("connected", () =>{
        console.log("Connected to Mongoose");
    });
    //What should happen with connection is open
    db.once("open", () =>{
        console.log("Open connection to Mongoose");
        callback();
    });
    db.once("error", () => {
        console.log("Error connecting to Mongoose");
    });
}

module.exports = {
 setUpConnectionHandlers: setUpConnectionHandlers,
 connect: connect,
};