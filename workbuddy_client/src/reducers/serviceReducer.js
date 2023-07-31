import getCurrentUser from "../utils/getCurrentUser";
const currentUser = getCurrentUser();

export const INITIAL_STATE = {
  userId: currentUser?.info?._id,
  title: "",
  category: "design",
  coverImage: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

export const serviceReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        coverImage: action.payload.coverImage,
        images: action.payload.images,
      };

    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
      };

    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };

    default:
      return state;
  }
};
