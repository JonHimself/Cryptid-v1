const INITIAL_STATE = {
  isSignedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGNED_IN":
      return { ...state, isSignedIn: true };
    case "SIGNED_OUT":
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
