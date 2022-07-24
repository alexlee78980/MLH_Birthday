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
    res.json({posts :posts.map(
        place =>
      place.toObject({ getters: true })
    )})
        // return {
        //     id:post.id,
        //     creator: post.creator,
        //     lng: post.lng,
        //     lat: post.lat,
        //     time: post.createdAt
        // }
    //})})
}

// return {
//     id:post.id,
//     caption: post.caption,
//     image: req.file.path,
//     comments: post.comments,
//     lng: post.lng,
//     lat: post.lat
// }

// {
//     "caption": "sdassad",
//     "lat": 49.032323,
//     "lng": 122.9439,
//     "creator":"dasdasd"
// }
export const addPost = async(req, res, next) => {
    const {caption, lng, lat, creator} = req.body
    console.log("ran")
    console.log(req.body)
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

export const addComments = async(req, res, next) => {
  const {id, name, comment, time} = req.body
  console.log("ran")
  console.log(req.body)
  let post
  try{
      post = await Post.findById(id)
  }catch(err){
      console.log("failed")
      const error = new HttpError(
          'Adding Comment failed, please try again later.',
          500
        );
        return next(error);
  }
  post.comments = [{name, comment, time}, ...post.comments]
    try{
      await post.save()
    }catch(err){
      console.log(err)
      const error = new HttpError(
          'Adding Comment failed please try again later.',
          500
        );
        return next(error);
    }
    res.json({post: post})

}