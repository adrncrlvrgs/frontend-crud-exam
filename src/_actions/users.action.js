import { usersConstants } from '../_constants/users.constants';
import userService from '../_service/users.service';

const request = (type) => ({ type });
const success = (type, payload) => ({ type, payload });
const failure = (type, error) => ({ type, error });

export const getAllUsers = () => async (dispatch) => {
  dispatch(request(usersConstants.GET_ALL_REQUEST));
  try {
    const users = await userService.getUsers();
    dispatch(success(usersConstants.GET_ALL_SUCCESS, users));
  } catch (error) {
    dispatch(failure(usersConstants.GET_ALL_FAILURE, error.toString()));
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch(request(usersConstants.UPDATE_USER_REQUEST));
  try {
    const updatedUser = await userService.updateUser(userId, userData);
    dispatch(success(usersConstants.UPDATE_USER_SUCCESS, updatedUser));
  } catch (error) {
    dispatch(failure(usersConstants.UPDATE_USER_FAILURE, error.toString()));
  }
};

export const createUser = (userData) => async (dispatch) => {
  dispatch(request(usersConstants.CREATE_USER_REQUEST));
  try {
    const newUser = await userService.createUser(userData);
    dispatch(success(usersConstants.CREATE_USER_SUCCESS, newUser));
  } catch (error) {
    dispatch(failure(usersConstants.CREATE_USER_FAILURE, error.toString()));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(request(usersConstants.DELETE_USER_REQUEST));
  try {
    const deletedUserId = await userService.deleteUser(userId);
    dispatch(success(usersConstants.DELETE_USER_SUCCESS, deletedUserId));
  } catch (error) {
    dispatch(failure(usersConstants.DELETE_USER_FAILURE, error.toString()));
  }
};