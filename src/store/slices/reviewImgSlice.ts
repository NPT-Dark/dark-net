import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ReviewImgState = {
  reviewData: {
    urls: string[];
    active: number;
  };
};

const initialState: ReviewImgState = {
  reviewData: {
    urls: [],
    active: 0,
  },
};

const reviewImgSlice = createSlice({
  name: "reviewImg",
  initialState,
  reducers: {
    addReviewImg(
      state,
      action: PayloadAction<{
        urls: string[];
        active: number;
      }>
    ) {
      state.reviewData = action.payload;
    },
  },
});

export const { addReviewImg } = reviewImgSlice.actions;
export default reviewImgSlice.reducer;
