

const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, required : true, ref : "user"},
    day : {
        type : String,
        required : true
    },
    slots : [
        {
            start : {
                type : String,
                required : true
            },
            end : {
                type : String,
                required : true
            }
        }
    ]
})

const availability = mongoose.model("Availability", availabilitySchema);

module.exports = availability;