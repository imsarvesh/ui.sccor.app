const profile = (state) => ({
  updateMyProfile: (action) => {
    console.log("updateMyProfile", action.payload);
    return {
      ...state,
      me: {
        ...action.payload,
      },
    };
  },
  updateUserProfile: (action) => {
    return {
      ...state,
      profile: action.payload,
    };
  },
});

export default profile;
