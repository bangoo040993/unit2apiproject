const { model, Schema } = require('mongoose')

const cartSchema = new Schema ({
    item: [{ type: Schema.Types.ObjectId, required: true, ref: 'Item' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}, 
{
    timestamps: true
})

const Cart = model('Cart', cartSchema)

module.exports = Cart