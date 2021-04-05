const router = require("express").Router();
const Users = require("../model/Users");
const { userAuth, checkRole } = require("../utils/Auth");


router.post("/addToWishlist/:id",userAuth ,checkRole['admin'],async  (req,res)=>{
  Users.findOne({_id:req.user.user_id})
    .then(user=>{
        let duplicate=false;
        if(user.wishlist.length>0){
            user.wishlist.map(product =>{
                if(product.id === req.params.id){
                    duplicate=true;
                }
            })
        }
        if(!duplicate){
            res.send('already in list')
        }
    })
})

router.post("/deletewishlist/:id",userAuth ,checkRole['user'],async  (req,res)=>{
  Users.UpdateOne({id:req.user.user_id},{
        $pull:{wishlist:{id:req.params.id}}
    })
    .then(product=>{
        res.status(200).json({message:"deleted wishlist item"})
    })
    .catch(error=>{
        res.status(500).json({message:"server error"})
    })
})
router.post("/clearwishlist",userAuth ,checkRole['user'],async  (req,res)=>{
  Users.UpdateOne({id:req.user.user_id},{
        $set:{"wishlist":[]}
    })
    .then(product=>{
        res.status(200).json({message:"wishlist cleared"})
    })
    .catch(error=>{
        res.status(500).json({message:"server error"})
    })
})

module.exports = router;