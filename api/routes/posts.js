const router = require("express").Router();
const PostModel = require("../models/Post");
const UserModel = require("../models/User");

//? Create a Post
router.post("/", async (req, res) => {
   const newPost = new PostModel(req.body);
   try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
   } catch (err) {
      res.status(500).json(err);
   }
}); 

//? Update a Post
router.put("/:id", async (req, res) => {
   try {
      const post = await PostModel.findById(req.params.id);
      if (post.userId === req.body.userId) {
         await post.updateOne({ $set: req.body });
         res.status(200).json(" Your post have been modified ");
      } else {
         res.status(403).json(" You can only modify your own posts");
      }
   } catch (err) {
      res.status(500).json(err);
   }
});

//? Delete a Post
router.delete("/:id", async (req, res) => {
   try {
      const post = await PostModel.findById(req.params.id);
      if (post.userId === req.body.userId) {
         await post.deleteOne();
         res.status(200).json(" Your post have been deleted ");
      } else {
         res.status(403).json(" You can only delete your own posts");
      }
   } catch (err) {
      res.status(500).json(err);
   }
});

//? Like / Dislike a Post
router.put("/:id/like", async (req, res) => {
   try {
      const post = await PostModel.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
         await post.updateOne({ $push: { likes: req.body.userId } });
         res.status(200).json("Post has been liked !");
      } else {
         await post.updateOne({ $pull: { likes: req.body.userId } });
         res.status(200).json("Post has been disliked !");
      }
   } catch (err) {
      res.status(500).json(err);
   }
});

//? Get a Post
router.get("/:id", async (req, res) => {
   try {
      const post = await PostModel.findById(req.params.id);
      res.status(200).json(post);
   } catch (err) {
      res.status(500).json(err);
   }
});

//? Get timeline posts
router.get("/timeline/:userId", async (req, res) => {
   try {
      const currentUser = await UserModel.findById(req.params.userId);
      const userPosts = await PostModel.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
         currentUser.followings.map((friendId) => {
            return PostModel.find({ userId: friendId });
         })
      );
      res.status(200).json(userPosts.concat(...friendPosts));
   } catch (err) {
      res.status(500).json(err);
   }
});

//? Get all user's posts
router.get("/profile/:username", async (req, res) => {
   try {
      const user = await UserModel.findOne({ username: req.params.username });
      const posts = await PostModel.find({ userId: user._id });
      res.status(200).json(posts);
   } catch (err) {
      res.status(500).json(err);
   }
});

module.exports = router;
