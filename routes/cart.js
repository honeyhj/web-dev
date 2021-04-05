const router = require("express").Router();
const Users = require("../model/Users");
const { userAuth, checkRole } = require("../utils/Auth");


router.post("/addToCart/:id",userAuth ,checkRole["admin"] ,async(req,res)=>{
    if(req.query.type === "add"){
        Users.findOne({_id:req.user.user_id})
    .then(user=>{
        let duplicate=false;
        if(user.cart.length>0){
            user.cart.map(product =>{
                if(product.id === req.params.id){
                    duplicate=true;
                }
            })
        }
        if(!duplicate){
            Users.updateOne({_id:req.user.user_id,"cart.id":req.params.id},{
                $inc:{"cart.$.quantity":1}})
        }else{
            Users.update({_id:req.user.user_id},{
                $push:{cart:{id:req.params.id,quantity:1}}
                })
        }
    })
    }else{
        Users.updateOne({_id:req.user.user_id,"cart.id":req.params.id},{
            $inc:{"cart.$.quantity":-1}})
    }
})

router.post("/deleteCart/:id",userAuth ,checkRole["admin"],async(req,res)=>{
    User.UpdateOne({id:req.user.user_id},{
        $pull:{cart:{id:req.params.id}}
    })
    .then(product=>{
        res.status(200).json({message:"deleted cart item"})
    })
    .catch(error=>{
        res.status(500).json({message:"server error"})
    })
})

router.post("/clearCart",userAuth ,checkRole["admin"],async(req,res)=>{
    User.UpdateOne({id:req.user.user_id},{
        $set:{"cart":[]}
    })
    .then(product=>{
        res.status(200).json({message:"cart cleared"})
    })
    .catch(error=>{
        res.status(500).json({message:"server error"})
    })
})

module.exports = router;