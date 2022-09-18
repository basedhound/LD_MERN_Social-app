const router = require("express").Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

// router.get("/", (req, res) => {
//    res.send("hey its user route");
// });

//? UPDATE
router.put("/:id", async (req, res) => {
   if (req.body.userId === req.params.id || req.body.isAdmin) {
      if (req.body.password) {
         try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
         } catch (err) {
            return res.json(err);
         }
      }
      try {
         const user = await UserModel.findByIdAndUpdate(req.params.id, {
            $set: req.body,
         });
         res.status(200).json("Account has been updated !");
      } catch (err) {
         return res.status(500).json(err);
      }
   } else {
      return res.status(403).json("You can only update your own account !");
   }
});

//? DELETE
router.delete("/:id", async (req, res) => {
   if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
         await UserModel.findByIdAndDelete(req.params.id);
         res.status(200).json("Account has been deleted !");
      } catch (err) {
         return res.status(500).json(err);
      }
   } else {
      return res.status(403).json("You can only delete your own account !");
   }
});

//? GET A USER 1
router.get("/:id", async (req, res) => {
   try {
      const user = await UserModel.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
   } catch (err) {
      res.status(500).json(err);
   }
});

//? GET A USER 1
// router.get("/:id", async (req, res) => {
//    try {
//       const user = await UserModel.findById(req.params.id);
//       const { password, updatedAt, ...other } = user._doc;
//       res.status(200).json(other);
//    } catch (err) {
//       res.status(500).json(err);
//    }
// });

// //? GET A USER 2
router.get("/", async (req, res) => {
   const userId = req.query.userId;
   const username = req.query.username;
   try {
      const user = userId
         ? await UserModel.findById(userId)
         : await UserModel.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
   } catch (err) {
      res.status(500).json(err);
   }
});

//? GET FRIENDS
router.get("/friends/:userId", async (req, res) => {
   try {
      const user = await UserModel.findById(req.params.userId);
      const friends = await Promise.all(
         user.followings.map((friendId) => {
            return UserModel.findById(friendId);
         })
      );
      let friendList = [];
      friends.map((friend) => {
         const { _id, username, profilePicture } = friend;
         friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList);
   } catch (err) {
      res.status(500).json(err);
   }
});

//? FOLLOW SYSTEM
router.put("/:id/follow", async (req, res) => {
   if (req.body.user !== req.params.id) {
      try {
         const user = await UserModel.findById(req.params.id); // User to be followed
         const currentUser = await UserModel.findById(req.body.userId); // User following
         if (!user.followers.includes(req.body.userId)) {
            // already followed
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({
               $push: { followings: req.params.id },
            });
            res.status(200).json("User has been followed !");
         } else {
            res.status(403).json("You already follow this user ! ");
         }
      } catch (err) {
         res.status(500).json(err);
      }
   } else {
      res.status(403).json("You can't follow yourself !");
   }
});

//? UNFOLLOW SYSTEM
router.put("/:id/unfollow", async (req, res) => {
   if (req.body.user !== req.params.id) {
      try {
         const user = await UserModel.findById(req.params.id); // User to be followed
         const currentUser = await UserModel.findById(req.body.userId); // User following
         if (user.followers.includes(req.body.userId)) {
            // If this user's followers includes this id...
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({
               $pull: { followings: req.params.id },
            });
            res.status(200).json("User has been unfollowed !");
         } else {
            res.status(403).json("You don't follow this user ! ");
         }
      } catch (err) {
         res.status(500).json(err);
      }
   } else {
      res.status(403).json("You can't unfollow yourself !");
   }
});

module.exports = router;
