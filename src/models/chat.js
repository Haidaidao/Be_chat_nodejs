const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const userSchema = new mongoose.Schema({
    userName: String,
});

const chatSchema = new mongoose.Schema({
        text: {
            type: String,
            required : true
        },
        user: String
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);
chatSchema.plugin(mongoose_delete, { overrideMethods: 'all' });

const Chat = mongoose.model('chat', chatSchema);

module.exports = Chat;
