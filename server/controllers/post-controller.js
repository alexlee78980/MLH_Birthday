import HttpError from "../models/http-error.js"
import Post from "../models/PostSchema.js"
export const allPost = async(req, res, next) =>{
    let posts
    try{
        posts = await Post.find({})
    }catch(err){
        const error = new HttpError(
            'Fetching posts failed, please try again later.',
            500
          );
          return next(error);
    }
    console.log("entered")
    res.json({posts :posts.map(post => {
        return {
            id:post.id,
            caption: post.caption,
            image: req.file.path,
            comments: post.comments,
            lng: post.lng,
            lat: post.lat
        }
    })})
}
// {
//     "caption": "sdassad",
//     "lat": 49.032323,
//     "lng": 122.9439,
//     "creator":"dasdasd"
// }
export const addPost = async(req, res, next) => {
    const {caption, lng, lat, creator} = req.body

    const createdPost = new Post({
        caption,
        lat,
        lng,
        image: req.file.path,
        creator,
        comments:[]
      });

      try{
        await createdPost.save()
      }catch(err){
        console.log(err)
        const error = new HttpError(
            'Fetching posts failed, please try again later.',
            500
          );
          return next(error);
      }
      res.json({post :createdPost})
}