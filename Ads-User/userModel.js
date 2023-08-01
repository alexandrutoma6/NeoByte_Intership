const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const userSchema = mongoose.Schema(
    {
        id: {
            type: ObjectId,
            default: new mongoose.Types.ObjectId()
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        ads: [
          {
            title: {
              type: String,
              required: false
            },
            description: {
              type: String,
              required: false
            }
          }
        ],
    },
    {timestamps:true}
)

const User = mongoose.model('User', userSchema);

module.exports = User;