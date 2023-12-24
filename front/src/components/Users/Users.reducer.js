export const Usersreducer = (state, action) => {
  if (action.type === "userState") {
    return {
      ...state,
      ListUsers: action.payload.ListUsers,
      loading: true,
    };
  }
  return state;
};
