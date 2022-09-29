import { configureStore } from "@reduxjs/toolkit";
import LoadingStateReducer from "./slices/loadingSlice";
import addRealmStateReducer from "./slices/addRealmSlice";

export default configureStore({
    reducer: {
        LoadingState: LoadingStateReducer,
        addRealmState: addRealmStateReducer
    },
});