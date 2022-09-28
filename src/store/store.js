import { configureStore } from "@reduxjs/toolkit";
import LoadingStateReducer from "./slices/loadingSlice";

export default configureStore({
    reducer: {
        LoadingState: LoadingStateReducer,
    },
});