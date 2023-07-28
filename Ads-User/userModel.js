const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
    },
    {timestamps:true}
)

const User = mongoose.model('User', userSchema);

module.exports = User;