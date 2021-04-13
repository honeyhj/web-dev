const router = require("express").Router();
const Users = require("../model/Users");
const { userAuth, checkRole } = require("../utils/Auth");


router.post("/addToWishlist/:id", userAuth, checkRole(['user']), async (req, res) => {
    Users.findOne({ _id: req.user.user_id })
        .then(user => {
            let duplicate = false;
            if (user.wishlist.length > 0) {
                user.wishlist.map(product => {
                    if (product.id === req.params.id) {
                        duplicate = true;
                    }
                })
            }
            if (!duplicate) {
                Users.updateOne({ _id: req.user.user_id }, {
                    $push: { wishlist: { productId: req.params.id } }
                })
                    .then(data => {
                        res.send(data)
                    })
                    .catch(error => {
                        console.log(error);
                    })
            } else {
                alert('already in list')
            }
        })
})
router.get("/getWishlist", userAuth, checkRole(["user"]), (req, res) => {
    Users.find({ _id: req.user.user_id }, { wishlist: 1 })
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send(error)
        })
})
router.delete("/deletewishlist/:id", userAuth, checkRole(['user']), async (req, res) => {
    Users.update({ _id: req.user.user_id }, {
        $pull: { wishlist: { productId: req.params.id } }
    })
        .then(product => {
            res.status(200).json({ message: "deleted wishlist item" })
        })
        .catch(error => {
            res.status(500).json({ message: "server error" })
        })
})
router.get("/clearwishlist", userAuth, checkRole(['user']), async (req, res) => {
    Users.update({ _id: req.user.user_id }, {
        $set: { "wishlist": [] }
    })
        .then(product => {
            res.status(200).json({ message: "wishlist cleared" })
        })
        .catch(error => {
            res.status(500).json({ message: "server error" })
        })
})

module.exports = router;