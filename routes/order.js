const router = require("express").Router();
const Orders = require ("../model/Order")
const { userAuth, checkRole } = require("../utils/Auth");


router.post("/createOrder",userAuth ,checkRole(['user']),async (req,res)=>{
  console.log(req.body,'fjkdsf iyfsjd');
  
  const {
  orderid,
  paymentid,
  products,
  total,
  dateofpurcashe,
  orderstatus,
  paymentmethod} =req.body;
  const orderrr =new Orders({
    userid:req.user.user_id,
    orderid,
  paymentid,
  products,
  total,
  paymentmethod
  })
  orderrr.save()
  .then(myOrder =>{

    res.status(201).json({message:'order saved'})
  })
  .catch(error=>{
    res.status(400).json({error:error})
  })
})
router.post("/updateOrder",userAuth ,checkRole(['user']),async  (req,res)=>{
  Orders.UpdateOne({_id:req.user.user_id},{
        $set:{orderstatus:req.body.orderstatus}
    })
    .then(product=>{
        res.status(200).json({message:"updated orderstatus"})
    })
    .catch(error=>{
        res.status(500).json({message:"failed to update order"})
    })
})
router.post("/deleteOrder/:id",userAuth ,checkRole(['user']),async  (req,res)=>{
  Orders.UpdateOne({id:req.user.user_id},{
        $pull:{orderid:{id:req.params.id}}
    })
    .then(product=>{
        res.status(200).json({message:"deleted order"})
    })
    .catch(error=>{
        res.status(500).json({message:"server error"})
    })
})

module.exports = router;