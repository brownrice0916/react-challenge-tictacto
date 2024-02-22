import { createSlice } from "@reduxjs/toolkit";
const initialState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action) => {
      console.log(
        "state in reducer",
        state[action.payload.x][action.payload.y]
      );
      state[action.payload.x][action.payload.y] = action.payload.currentPlayer;
    },
    reset: (state) => {
      return initialState;
    },
  },
});

export const { setBoard, reset } = boardSlice.actions;
export default boardSlice.reducer;
