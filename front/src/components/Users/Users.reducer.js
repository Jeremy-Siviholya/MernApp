export const Usersreducer = (state, action) => {
  if (action.type === "userState") {
    return {
      ...state,
      ListUsers: action.payload.ListUsers,
      loading: true,
    };
  }
   if (action.type === "destroyUser") {
     return {
       ...state,
       ListUsers: action.payload.ListUsers,

     };
   }
  return state;
};


