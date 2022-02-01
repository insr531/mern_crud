import { createSlice } from "@reduxjs/toolkit";

export const updateUserSlice = createSlice({
    name: "updateUser",
    initialState: { value: {modalId:0, modalIsOpen: false, name:"", location:""} },
    reducers: {
        updateUser: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { updateUser } = updateUserSlice.actions;
export default updateUserSlice.reducer;