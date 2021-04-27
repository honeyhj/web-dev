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
})

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

router.post("/uploadProduct",upload.array('Images'), async (req, res) => {


let Images = [];

  if (req.files.length > 0) {
    Images = req.files.map((file) => {
      return file.filename ;
    });
  }

  const {
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
    selectedsize,
    feature,
    trend,
  } = req.body;

console.log(req.body,'djfhdjkfkjfdfdffdf');
console.log(Images,'imagesssssssssss');

  const product = new Product({
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
    selectedsize,
    feature,
    trend,
  });
  await product.save((err) => {
    console.log(err);
    
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
router.get("/get-allproducts", async (req, res) => {
  await Product.find({})
  .then(product => {
    res.status(200).json({
      success: true,
      product,
    })
  })
  .catch(error=>{
    res.status(400).json({error})
    console.log(error);
    
  })
})
router.get("/getDetailsProduct/:id",async (req, res)=>{
  console.log( req.params.id,'iiidiiiidiiddddddiddididd');

  await Product.findOne({_id: req.params.id})
  .then(product => {
    console.log(product);
    
    res.status(200).json(product)
  })
  .catch(error=>{
    res.status(400).json({error})
    console.log(error);
    
  })
})
router.post("/update-product/:id",upload.array('Images') async (req, res) => {
  console.log(req.body,'jsadkdfhskjdhaskkj');
  
  const {
    title,
    skunumber,
    description,
    price,
    quantity,
    weaight,
    brand,
    discount,
    stock,
  } = req.body;
  await Product.findOne({_id:req.params.id})
  .then(product =>{
    product.title = title,
    product.skunumber = skunumber,
    product.description = description,
    product.price = price,
    product.quantity = quantity,
    product.weaight = weaight,
    product.brand = brand,
    product.discount = discount,
    product.stock = stock,
    product.save((error, product) =>{
      if(error){
        console.log(error,'saveeeeee');
        
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
    console.log(error,'catchhhhhhhh');
    res.status(500).json({
      message:'server error'
    })
  })
})
router.get("/delete-product/:id",async (req,res)=>{
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