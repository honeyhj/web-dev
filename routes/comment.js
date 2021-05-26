const router = require("express").Router();
const Comment = require("../model/Comments");
const { userAuth, checkRole } = require("../utils/Auth");

router.post('/addComment', userAuth, checkRole(['user']), async (req, res) => {
  console.log(req.body.comment,'comments');
  const {
    productId,
    comment,
    rating
  } = req.body;
  const com = await new Comment({
    userId: req.user.user_id,
    productId,
    comment,
    rating,

  })
  com.save()
    .then(result => {
      res.status(201).json({ message: 'added' })
    })
    .catch(error => {
      console.log(error);
      res.status(400).json(error)
    })
})

router.get('/getComment/:id', async (req, res) => {
  await Comment.find({ productId: req.params.id }).populate('userId')
  .then(result => {
    res.status(201).json(result)
  })
  .catch(error => {
    console.log(error);
    
    res.status(400).json(error)
  })
})

module.exports = router;