const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema is a skeleton for the model
const noteSchema = new Schema({
    title : {
        type : String, 
        required : true
    },
    desc : {
        type : String, 
        required : true
    }
}, {timestamps: true});

// model wraps around the schema and communicates with db 
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;