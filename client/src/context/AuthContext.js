import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
   user: {
      _id: "6320bd892239b36f889cb877",
      username: "Jane",
      email: "jane@gmail.com",
      profilePicture: "person/1.jpeg",
      coverPicture: "",
      followers: [],
      followings: [],
   },
   isFetching: false,
   error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

   return (
      <AuthContext.Provider
         value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch,
         }}>
         {children}
      </AuthContext.Provider>
   );
};

// "Children" is the element I'm about to "wrap" into Context (index.js)
