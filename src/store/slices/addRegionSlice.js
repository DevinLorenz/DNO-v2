import { createSlice } from "@reduxjs/toolkit";

export const addRegionState = createSlice({
    name: "isAddingRegion",
    initialState: {
        value: false,
    },
    reducers: {
        setAddRegionTrue: (state) => {
            state.value = true;
        },
        setAddRegionFalse: (state) => {
            state.value = false;
        }
    }
})

export const { setAddRegionTrue, setAddRegionFalse } = addRegionState.actions;

export const selectAddRegion = (state) => {
    // console.log('SELECT ADD Region', state.addRegionState);
    return state.addRegionState.value;
}

export default addRegionState.reducer;