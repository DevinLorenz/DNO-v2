import { createSlice } from "@reduxjs/toolkit";

export const addNpcState = createSlice({
    name: "isAddingNpc",
    initialState: {
        value: false,
    },
    reducers: {
        setAddNpcTrue: (state) => {
            state.value = true;
        },
        setAddNpcFalse: (state) => {
            state.value = false;
        }
    }
})

export const { setAddNpcTrue, setAddNpcFalse } = addNpcState.actions;

export const selectAddNpc = (state) => {
    // console.log('SELECT ADD Npc', state.addNpcState);
    return state.addNpcState.value;
}

export default addNpcState.reducer;