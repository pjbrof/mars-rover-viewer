const reducer = (state, action) => {
  switch (action.type) {
    case "generalInfo":
      return {
        ...state,
        ...action.payload,
      };
    case "currentSolPhotos":
      return {
        ...state,
        sol: action.payload.weather.sol,
        ...action.payload,
      };
    case "getPhotos":
      return {
        ...state,
        photos: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
