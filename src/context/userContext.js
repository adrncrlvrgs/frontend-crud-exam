import React, { createContext, useReducer } from "react";
import { usersConstants } from "../_constants/users.constants";

const UserContext = createContext();

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state, action) => {
  console.log('Reducer action:', action);
  switch (action.type) {
    case usersConstants.GET_ALL_REQUEST:
    case usersConstants.UPDATE_USER_REQUEST:
    case usersConstants.CREATE_USER_REQUEST:
    case usersConstants.DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case usersConstants.GET_ALL_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case usersConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
      };

    case usersConstants.CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
      };

    case usersConstants.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter(user => user.id !== action.payload),
      };

    case usersConstants.GET_ALL_FAILURE:
    case usersConstants.UPDATE_USER_FAILURE:
    case usersConstants.CREATE_USER_FAILURE:
    case usersConstants.DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
