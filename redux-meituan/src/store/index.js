import { configureStore } from "@reduxjs/toolkit";
import foodsStore from "./modules/takeaway";

const store = configureStore({
  reducer: {
    foods: foodsStore,
  },
});

export default store;
