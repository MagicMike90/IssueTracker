import * as types from './actionTypes'

export const addNotification = (message, level) => ({
  type: types.ADD_NOTIFICATION,
  message,
  level
});
