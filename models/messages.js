const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const message = new Schema({
    chatRoomId: {
        type: Schema.Types.ObjectId, 
        ref: 'chatroom'
    },
    senderUserId:{
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', message);

module.exports = Message;