const Users = require("../model/Users");

const router = require("express").Router();

router.post("/addToCart/:id",userAuth ,checkRole['user'],async  (req,res)=>{
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
            user.cart.push({id:req.user.id,quantity:1})
        }
    })
})
router.post("/deleteCart/:id",userAuth ,checkRole['user'],async  (req,res)=>{
    User.UpdateOne({id:req.user.user_id},{
        $pull:{"cart":{"id":req.query.id}}
    })
    .then(product=>{
        res.status(200).json({message:"deleted cart item"})
    })
    .catch(error=>{
        res.status(500).json({message:"server error"})
    })
})
router.post("/clearCart/:id",userAuth ,checkRole['user'],async  (req,res)=>{
    User.UpdateOne({id:req.user.user_id},{
        $set:{"cart":{"id":req.query.id}}
    })
    .then(product=>{
        res.status(200).json({message:"deleted cart item"})
    })
    .catch(error=>{
        res.status(500).json({message:"server error"})
    })
})

module.exports = router;