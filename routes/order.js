const router = require("express").Router();
const Orders = require("../model/Order");
const Users = require("../model/Users");
const { userAuth, checkRole } = require("../utils/Auth");


function getNumber(callback) {
  var n = Math.floor(Math.random() * 1000);
  Users.findOne({ orderid: n },
    function (err, result) {
      if (err) callback(err);
      else if (result) return getNumber(callback);
      else callback(null, n);
    }
  );
}

router.post("/createOrder", userAuth, checkRole(['user']), async (req, res) => {
  console.log(req.body, 'fjkdsf iyfsjd');
  const {
    paymentid,
    products,
    address,
    total,
    orderstatus,
    paymentmethod } = req.body;
  getNumber(function (error, number) {
    // console.log(number);
    // let refnumber=number
    const  orderrr = new Orders({
      userid: req.user.user_id,
      orderid: number,
      paymentid,
      products,
      address,
      orderstatus,
      dateofpurcashe: Date.now(),
      total,
      paymentmethod
    })
    orderrr.save()
    .then(myOrder => {
      res.status(201).json({ message: 'order saved' })
    })
    .catch(error => {
      res.status(400).json({ error: error })
    })
  })
  
})
router.get("/getOrder", async (req, res) =>{
  await Orders.find()
  .then(result => {
    console.log(result,'resultttttttttttttttt');
    res.status(200).json(result)
  })
  .catch(error => {
    res.status(400).json({ error: error })
  })
})
router.post("/updateOrder", userAuth, checkRole(['user']), async (req, res) => {
  console.log(req.body.editabale,req.body.id,'bodyyyy ');
  const {editabale,id} = req.body;
  Orders.updateOne({ userid: req.user.user_id ,"orderid":id}, {
    $set: { orderstatus: editabale }
  })
    .then(product => {
      console.log(product,'product log');
      
      res.status(200).json({ message: "updated orderstatus" })
    })
    .catch(error => {
      res.status(500).json({ message: "failed to update order" })
    })
})
router.delete("/deleteOrder/:id", userAuth, checkRole(['user']), async (req, res) => {
  console.log(req.params.id,'params iiidiiiidiiddddddiddididd');
  
  Orders.deleteOne({ userid: req.user.user_id ,"orderid":req.params.id})
    .then(product => {
      console.log(product,'delete order');
      
      res.status(200).json({ message: "deleted order" })
    })
    .catch(error => {
      res.status(500).json({ message: "server error" })
    })
})

module.exports = router;