const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = mongoose.Schema({
    userid:{ type: Schema.Types.ObjectId, ref: 'users'},
    orderid:{
        type:String
    },
    paymentid:{
        type:String
    },
    products:{
        type: Array,
        default: []
    },
    address:{
        type:Object
    },
    total:{
        type:String
    },
    dateofpurcashe:{
        type: Date
    },
    orderstatus:String,
    paymentmethod:String,
}, { timestamps: true })



const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
