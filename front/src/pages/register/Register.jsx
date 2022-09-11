import "./register.css";

export default function Register() {
   return (
      <div className="login">
         <div className="loginWrapper">
            <div className="loginLeft">
               <h2 className="loginLogo">Social</h2>
               <span className="loginDesc">
                  Connect with friends and the world around you on Social.
               </span>
            </div>
            <div className="loginRight">
               <div className="loginBox">
                  <div className="registerNameLastname">
                     <input placeholder="Name" className="loginInputName" />
                     <input placeholder="Last name" className="loginInputName" />
                  </div>
                  <input placeholder="Email" className="loginInput" />
                  <input placeholder="Password" className="loginInput" />
                  <input placeholder="Confirm Password" className="loginInput" />
                  <button className="loginButton">Sign Up</button>
                  <span className="bar"></span>
                  <button className="loginRegisterButton">
                     Already have an account ?
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
