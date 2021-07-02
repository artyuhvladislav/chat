const reducer = (state, action) => {
  switch (action.type) {
    case "JOINED":
      return {
        ...state,
        joined: true,
        userName: action.payload.userName,
        roomID: action.payload.roomID,
      };

    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "NEW_MESSAGES":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "SET_DATA":
      return {
        ...state,
        users: action.payload.users,
        messages: action.payload.messages,
      };
      
    default:
      return state;
  }
};
export default reducer;
