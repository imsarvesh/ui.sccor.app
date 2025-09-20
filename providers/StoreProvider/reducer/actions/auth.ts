const auth = (state) => ({
  loggedIn: (action) => {
    return {
      ...state,
      session: {
        ...action.payload.session,
      },
      me: {
        ...action.payload.me,
      },
      isLoggedIn: true,
    };
  },
  loggedOut: () => {
    return {
      ...state,
      session: null,
      me: null,
      isLoggedIn: false,
    };
  },
});

export default auth;
