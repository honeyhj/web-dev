const router = require("express").Router();
const {
  Product
} = require("../model/Product");
const multer = require("multer");
const { userAuth, checkRole } = require("../utils/Auth");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("Only jpg and png are allowd"), false);
    }
    cb(null, true);
  },
});

var upload = multer({
  storage: storage
}).single("file");

router.post("/uploadImage", (req, res) => {
  console.log(req);
  upload(req, res, (err) => {
    if (err) {
      return res.json({
        success: false,
        err
      });
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/uploadProduct", async (req, res) => {
  console.log("post a product");
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({
      success: false,
      err
    });

    return res.status(200).json({
      success: true
    });
  });
});
router.post("/get-products", async (req, res) => {
  const {
    skip,
    limit
  } = req.body.variables;

  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let Limit = req.body.variables.limit ? parseInt(req.body.variables.limit) : 100;
  let Skip = req.body.variables.skip ? parseInt(req.body.variables.skip) : 0;
  console.log('clicked', Skip, Limit);
  await Product.find({}).skip(Skip).limit(Limit).sort({
    "_id": 1
  }).then(product => {

    console.log('length', product.length)
    res.status(200).json({
      success: true,
      product,
      postSize: product.length
    })
  })
})
router.post("/update-product/:id", async (req, res) => {
  const {
    Images,
    title,
    skunumber,
    description,
    price,
    quantity,
    weaight,
    category,
    subcategory,
    brand,
    discount,
    stock,
    shippingdetails,
    manufacturesdetails,
    selectedsize
  } = req.body;
  await Product.findOne({_id:req.params.id})
  .then(product =>{
    product.Images = Images
    product.title = title,
    product.skunumber = skunumber,
    product.description = description,
    product.price = price,
    product.quantity = quantity,
    product.weaight = weaight,
    product.category = category,
    product.subcategory = subcategory,
    product.brand = brand,
    product.discount = discount,
    product.stock = stock,
    product.shippingdetails = shippingdetails,
    product.manufacturesdetails = manufacturesdetails,
    product.selectedsize = selectedsize
    product.save((error, product) =>{
      if(error){
        res.status(400).json({
          error
        })
      }
      if(product){
        res.status(400).json({
          message:'updated product'
        })
      }
    })
  })
  .catch(error=>{
    res.status(500).json({
      message:'server error'
    })
  })
})
router.get("/delete-product/:id",userAuth,checkRole['admin'],async (req, res)=>{
  await Product.deleteOne({_id:req.params.id})
  .then(product=>{
    res.status(200).json({
      message:'deleted'
    })
  })
  .catch(error=>{
    res.status(500).json({
      message:'server error'
    })
  })
})
module.exports = router;

// const express = require('express');
// const router = express.Router();
//  const { Product } = require("../model/Product");
// const multer = require('multer');

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`)
//     },
//     fileFilter: (req, file, cb) => {
//         const ext = path.extname(file.originalname)
//         if (ext !== '.jpg' || ext !== '.png') {
//             return cb(res.status(400).end('only jpg, png are allowed'), false);
//         }
//         cb(null, true)
//     }
// })

// var upload = multer({ storage: storage }).single("file")

// router.post("/uploadImage", (req, res) => {

//     upload(req, res, err => {
//         if (err) {
//             return res.json({ success: false, err })
//         }
//         return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
//     })

// });