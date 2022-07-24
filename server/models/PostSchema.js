import mongoose from "mongoose"
const PostSchema = mongoose.Schema({
    caption: {
      type: String,
      required: true
    },
    image: { type: String, required: true },
    creator: {
      type: String,
      required: true
    },
    comments: [{
        name:{type: String, required: true},
        comment: {type: String, required: true},
        time: {type: String, required: true},
    }],
    lng: {
      type: Number,
      required: true
    },
    lat: {
      type: Number,
      required: true
    }
  }, { timestamps: true })
  export default mongoose.model('Post', PostSchema);