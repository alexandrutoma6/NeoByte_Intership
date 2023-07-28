const mongoose = require('mongoose');

const adSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
    },
    {timestamps:true}
)
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;