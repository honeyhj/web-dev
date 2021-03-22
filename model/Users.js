const {Schema,model} =require('mongoose');


const UserSchema=new Schema({
    fullname:{
        type:String,
    },
    address:{
        type:String
    },
    mobile:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    cart:{
        type:Array,
        default:[]
    },
    wishlist:{
        type:Array,
        default:[]
    },
    username:{
        type:String,
    },
    password:{
        type:String
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    activeToken:String,
    id:String
},
{timestamps:true}
)
module.exports=model("users",UserSchema);