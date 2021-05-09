const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentsSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
  productId: {
    type: String
  },
  comment: {
    type: String
  },
  ratings: {
    type: Number
  }
},{timestamps:true})


const Comment = mongoose.model('Comment', CommentsSchema);

module.exports = Comment;