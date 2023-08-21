const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoom = new Schema({
    userId: {
        type: Number,
        required: true,
    },
    name: String,
    participants:{
        type: Number
    }
});

const ChatRoom = mongoose.model('chatroom', chatRoom);

module.exports = ChatRoom;