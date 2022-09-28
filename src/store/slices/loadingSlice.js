import { createSlice } from '@reduxjs/toolkit';

export const LoadingState = createSlice({
    name: 'isLoading',
    initialState: {
        value: false,
    },
    reducers: {
        setLoadingTrue: (state) => {
            state.value = true;
        },
        setLoadingFalse: (state) => {
            state.value = false;
        },
        toggleLoading: (state) => {
            state.value = !state.value;
        }
    
    }
})

export const { setLoadingTrue, setLoadingFalse, toggleLoading } = LoadingState.actions;

export const selectLoading = (state) => {
    console.log('SELECT LOADING', state.isLoading)
    return state.LoadingState.value;
}

export default LoadingState.reducer;
