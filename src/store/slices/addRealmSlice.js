import { createSlice } from "@reduxjs/toolkit";

export const addRealmState = createSlice({
    name: "isAddingRealm",
    initialState: {
        value: false,
    },
    reducers: {
        setAddRealmTrue: (state) => {
            state.value = true;
        },
        setAddRealmFalse: (state) => {
            state.value = false;
        }
    }
})

export const { setAddRealmTrue, setAddRealmFalse } = addRealmState.actions;

export const selectAddRealm = (state) => {
    // console.log('SELECT ADD REALM', state.addRealmState);
    return state.addRealmState.value;
}

export default addRealmState.reducer;