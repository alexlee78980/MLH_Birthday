import mongoose from "mongoose"
const PostSchema = {
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
        user: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
        text: {type: String, required: true},
        date: {type: String, required: true},
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
  }
  export default mongoose.model('Post', PostSchema);