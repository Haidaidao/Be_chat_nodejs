const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required : true
        },
        password: {
            type: String,
            required : true
        },
        email: String,
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
userSchema.methods.setPassword = async function(password) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
};
userSchema.methods.validatePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
