import { createSlice } from "@reduxjs/toolkit";

export const addTownState = createSlice({
    name: "isAddingTown",
    initialState: {
        value: false,
    },
    reducers: {
        setAddTownTrue: (state) => {
            state.value = true;
        },
        setAddTownFalse: (state) => {
            state.value = false;
        }
    }
})

export const { setAddTownTrue, setAddTownFalse } = addTownState.actions;

export const selectAddTown = (state) => {
    // console.log('SELECT ADD TOWN', state.addTownState);
    return state.addTownState.value;
}

export default addTownState.reducer;