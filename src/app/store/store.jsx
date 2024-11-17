import { createContext, useReducer } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({ interests: [] });

const interestReducer = (state, action) => {
  switch (action.type) {
    case "add":
      if(state.interests.find(e=> e === action.payload)) {
          // console.log("already added tag.");
          return state;
      }
      return { ...state, interests: [...state.interests, action.payload] };
    case "remove":
      return {
        ...state,
        interests: state.interests.filter((el) => el !== action.payload),
      };
    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(interestReducer, { interests: [] });
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
