import { createContext, useReducer } from "react";

export const UserContext = createContext({ interests: [] });

const interestReducer = (state, action) => {
  switch (action.type) {
    case "add":
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

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(interestReducer, { interests: [] });
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
