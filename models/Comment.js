const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ReplySchema = new Schema(
  {
    //set custom id avoid confusion with parent comment_id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length
})

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
