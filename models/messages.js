const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const message = new Schema({
    senderUserId:{
        type: Number,
        required: true
    },
    senderName:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', message);

module.exports = Message;