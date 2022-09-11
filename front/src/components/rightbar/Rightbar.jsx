import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ profile }) {
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
            <h2 className="rightbarTitle">User Information</h2>
            <div className="rightbarInfo">
               <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">City : </span>
                  <span className="rightbarInfovalue">New York</span>
               </div>
               <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">From : </span>
                  <span className="rightbarInfovalue">Madrid</span>
               </div>
               <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Relationship : </span>
                  <span className="rightbarInfovalue">Single</span>
               </div>
            </div>
            <h2 className="rightbarTitle">User Friends</h2>
            <div className="rightbarFollowings">
               <div className="rightbarFollowing">
                  <img src="assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingUsername">Amos Burton</span>
               </div>
               <div className="rightbarFollowing">
                  <img src="assets/person/2.jpeg" alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingUsername">Amos Burton</span>
               </div>
               <div className="rightbarFollowing">
                  <img src="assets/person/3.jpeg" alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingUsername">Amos Burton</span>
               </div>
               <div className="rightbarFollowing">
                  <img src="assets/person/4.jpeg" alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingUsername">Amos Burton</span>
               </div>
               <div className="rightbarFollowing">
                  <img src="assets/person/5.jpeg" alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingUsername">Amos Burton</span>
               </div>
               <div className="rightbarFollowing">
                  <img src="assets/person/6.jpeg" alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingUsername">Amos Burton</span>
               </div>
            </div>
         </>
      );
   };

   
   return (
      <div className="rightbar">
         <div className="rightbarWrapper">
            {profile? <ProfileRightbar /> : <HomeRightbar/>}
         </div>
      </div>
   );
}
