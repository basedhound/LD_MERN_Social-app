import "./login.css";

export default function Login() {
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
                  <input placeholder="Email" className="loginInput" />
                  <input placeholder="Password" className="loginInput" />
                  <button className="loginButton">Log In</button>
                  <a href="/" className="loginForgot">Forgot Password ?</a>
                  <span className="bar"></span>
                  <button className="loginRegisterButton">
                     Create new account
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
