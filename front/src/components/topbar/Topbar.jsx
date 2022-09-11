import "./topbar.css";

import { Search, Person, Chat, Notifications } from "@mui/icons-material";

export default function topbar() {
   return (
      <div className="topbarContainer">
         <div className="topbarLeft">
            <div className="logo">Social</div>
         </div>
         <div className="topbarCenter">
            <div className="searchbar">
               <Search className="searchIcon" />
               <input
                  placeholdere="Search for friend, post or video"
                  className="searchInput"
               />
            </div>
         </div>
         <div className="topbarRight">
            <div className="topbarLinks">
               <span className="topbarLink">Homepage</span>
               <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
               <div className="topbarIcon">
                  <Person />
                  <span className="topbarIconBadge">1</span>
               </div>
               <div className="topbarIcon">
                  <Chat />
                  <span className="topbarIconBadge">2</span>
               </div>
               <div className="topbarIcon">
                  <Notifications />
                  <span className="topbarIconBadge">3</span>
               </div>
            </div>
            <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
         </div>
      </div>
   );
}
