import { configureStore } from "@reduxjs/toolkit";
import board from "../modules/boardSlice";
const store = configureStore({
  reducer: { board },
});

export default store;
