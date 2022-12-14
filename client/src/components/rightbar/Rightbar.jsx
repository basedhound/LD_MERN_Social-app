import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER; //? Images
   const [friends, setFriends] = useState([]);
   const { user: currentUser, dispatch } = useContext(AuthContext); //? User Context
   const [followed, setFollowed] = useState(
      currentUser.followings.includes(user?.id)
   );

   //? Display Friends on the right
   useEffect(() => {
      const getFriends = async () => {
         try {
            const friendList = await axios.get("/users/friends/" + user._id);
            setFriends(friendList.data);
         } catch (err) {
            console.log(err);
         }
      };
      getFriends();
   }, [user]);

   //? Follow / Unfollow Button system
   const handleClick = async () => {
      try {
         if (followed) {
            await axios.put("/users/" + user._id + "/unfollow", {
               userId: currentUser._id,
            });
            dispatch({ type: "UNFOLLOW", payload: user._id });
         } else {
            await axios.put("/users/" + user._id + "/follow", {
               userId: currentUser._id,
            });
            dispatch({ type: "FOLLOW", payload: user._id });
         }
      } catch (err) {
         console.log(err);
      }
      setFollowed(!followed);
   };

   const HomeRightbar = () => {
      return (
         <>
            <div className="birthdayContainer">
               <img className="birthdayImg" src="assets/gift.png" alt="" />
               <span className="birthdayText">
                  <b>James Holden</b> and <b>3 other friends</b> have a birthday
                  today
               </span>
            </div>
            <img src="assets/ad.png" alt="" className="rightbarAd" />
            <h2 className="rightbarTitle">Online Friends</h2>
            <ul className="rightbarFriendList">
               {Users.map((user) => (
                  <Online key={user.id} user={user} />
               ))}
            </ul>
         </>
      );
   };

   const ProfileRightbar = () => {
      return (
         <>
            {user.username !== currentUser.username && (
               <button className="rightbarFollowButton" onClick={handleClick}>
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? <Remove /> : <Add />}
               </button>
            )}
            <h2 className="rightbarTitle">User Information</h2>
            <div className="rightbarInfo">
               <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">City : </span>
                  <span className="rightbarInfovalue">{user.city}</span>
               </div>
               <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">From : </span>
                  <span className="rightbarInfovalue">{user.from}</span>
               </div>
               <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Relationship : </span>
                  <span className="rightbarInfovalue">{user.relationship}</span>
               </div>
            </div>
            <h2 className="rightbarTitle">User Friends</h2>
            <div className="rightbarFollowings">
               {friends.map((friend) => (
                  <Link
                     key={friend}
                     to={"/profile/" + friend.username}>
                     <div className="rightbarFollowing">
                        <img
                           src={
                              friend.profilPicture
                                 ? PF + friend.profilePicture
                                 : PF + "person/noAvatar.png"
                           }
                           alt=""
                           className="rightbarFollowingImg"
                        />
                        <span className="rightbarFollowingUsername">
                           {friend.username}
                        </span>
                     </div>
                  </Link>
               ))}
            </div>
         </>
      );
   };

   return (
      <div className="rightbar">
         <div className="rightbarWrapper">
            {user ? <ProfileRightbar /> : <HomeRightbar />}
         </div>
      </div>
   );
}
