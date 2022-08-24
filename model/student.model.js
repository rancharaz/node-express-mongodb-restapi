//model creation
const mongoose = require('mongoose'); //initiate mongoose
const Schema = mongoose.Schema; //initiate mg Schema / table

let studentSchema = new Schema({
    //assigning types for the data
    first_name : {
        type: String
    },
    last_name : {
        type:String
    },
    email : {
        type: String
    },
    password: {
        type: String
    }
},
    //assigning collection //table
    {
        collection: 'students'
    }
);
//export the code through mongoose.model
module.exports = mongoose.model('StudentSchema', studentSchema)