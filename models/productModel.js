const mongoose = require('mongoose')

const porductSchema = mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          stock: {
            type: Number,
            required: true,
          },
    },
    {timestamps:true}
)

const Product = mongoose.model('Product', porductSchema);

module.exports = Product;