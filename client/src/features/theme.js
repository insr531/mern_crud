import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: "theme",
    initialState: { value: "" },
    reducers: {
        themeColor: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { themeColor } = themeSlice.actions;
export default themeSlice.reducer;