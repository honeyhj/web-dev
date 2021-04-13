const route = require("express").Router();
const Users = require("../model/Users");
const mongoose = require("mongoose");
const { userAuth, checkRole } = require("../utils/Auth");


<<<<<<< HEAD
router.post("/addToCart/:id",userAuth ,checkRole(["admin"]) ,async(req,res)=>{
    if(req.query.type === "add"){
        Users.findOne({_id:req.user.user_id})
    .then(user=>{
        let duplicate=false;
        if(user.cart.length>0){
            user.cart.map(product =>{
                if(product.id === req.params.id){
                    duplicate=true;
=======
route.post("/addToCart", userAuth, checkRole(["user"]), (req, res) => {
    console.log(req.body.product,'body product');
    if (req.body.type === "add") {
        Users.findOne({ _id: req.user.user_id })
            .then(user => {
                let duplicate = false;
                if (user.cart.length > 0) {
                    user.cart.map(product => {
                        console.log(product,'product dorkarrr')
                        if (product.productId === req.body.product) {
                            duplicate = true;
                        }
                    })
                }
                if (!duplicate) {
                    Users.updateOne({ _id: req.user.user_id }, {
                        $push: { cart: {productId:req.body.product,quantity:1} }
                    })
                    .then(data=>{
                        res.send(data)
                    })
                    .catch(error=>{
                        console.log(error);
                    })
                } else {
                    Users.updateOne({ _id: req.user.user_id, "cart.productId":req.body.product }, {
                        $inc: { "cart.$.quantity": 1 }
                    })
                    .then(data=>{
                        res.send(data)
                    })
                    .catch(error=>{
                        console.log(error);
                    })
>>>>>>> a794301356fcf481f0df4189d1b056645fad5065
                }
            })
    } else {
        Users.updateOne({ _id: req.user.user_id, "cart.productId":req.body.product}, {
            $inc: { "cart.$.quantity": -1 }
        })
        .then(data=>{
            res.send(data)
        })
        .catch(error=>{
            console.log(error);
        })
    }
})
<<<<<<< HEAD

router.post("/deleteCart/:id",userAuth ,checkRole(["admin"]),async(req,res)=>{
    User.UpdateOne({id:req.user.user_id},{
        $pull:{cart:{id:req.params.id}}
    })
    .then(product=>{
        res.status(200).json({message:"deleted cart item"})
=======
route.get("/getCart", userAuth, checkRole(["user"]),(req,res)=>{
    Users.find({_id:req.user.user_id},{cart:1})
    .then(data=>{
        res.send(data)
>>>>>>> a794301356fcf481f0df4189d1b056645fad5065
    })
    .catch(error=>{
        res.send(error)
    })
})
<<<<<<< HEAD

router.post("/clearCart",userAuth ,checkRole(["admin"]),async(req,res)=>{
    User.UpdateOne({id:req.user.user_id},{
        $set:{"cart":[]}
=======
route.delete("/deleteCart/:id", userAuth, checkRole(["user"]), (req, res) => {
    Users.update({ _id: req.user.user_id }, {
        $pull: { cart: { productId: req.params.id } }
>>>>>>> a794301356fcf481f0df4189d1b056645fad5065
    })
        .then(product => {
            res.status(200).json({ message: "deleted cart item" })
        })
        .catch(error => {
            res.status(500).json(error.error)
        })
})

route.get("/clearCart", userAuth, checkRole(["user"]), (req, res) => {
    Users.update({ _id: req.user.user_id }, {
        $set: { "cart": [] }
    })
        .then(product => {
            res.status(200).json({ message: "cart cleared" })
        })
        .catch(error => {
            res.status(500).json({ message: "server error" })
            console.log(error);
        })
})

module.exports = route;