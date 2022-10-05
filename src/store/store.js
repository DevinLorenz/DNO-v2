import { configureStore } from "@reduxjs/toolkit";
import LoadingStateReducer from "./slices/loadingSlice";
import addRealmStateReducer from "./slices/addRealmSlice";
import addRegionStateReducer from "./slices/addRegionSlice";
import addTownStateReducer from "./slices/addTownSlice";
import addNpcStateReducer from "./slices/addNpcSlice";

export default configureStore({
    reducer: {
        LoadingState: LoadingStateReducer,
        addRealmState: addRealmStateReducer,
        addRegionState: addRegionStateReducer,
        addTownState: addTownStateReducer,
        addNpcState: addNpcStateReducer,
    },
});