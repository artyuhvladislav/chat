const reducer = (state, action) => {
  switch (action.type) {
    case "JOINED":
      return {
        ...state,
        joined: true,
        userName: action.payload.userName,
        roomID: action.payload.roomID
      };

    default:
      return state;
  }
};
export default reducer