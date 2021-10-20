const INITIAL_STATE = {
  darkTheme: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "dark":
      return { ...state, darkTheme: true };
    case "light":
      return { ...state, darkTheme: false };
    default:
      return state;
  }
};
