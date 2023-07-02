const { model, Schema } = require('mongoose')

const cartSchema = new Schema ({
    items: [{ type: Schema.Types.ObjectId, required: true, ref: 'Item' }],
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
}, 
{
    timestamps: true
})

const Cart = model('Cart', cartSchema)

module.exports = Cart