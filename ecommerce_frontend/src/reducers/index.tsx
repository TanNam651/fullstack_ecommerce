import { combineReducers, configureStore} from "@reduxjs/toolkit";
import {Reducer as AppReducer} from "./appReducer/Reducer";
// import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import {IState} from "@/reducers/appReducer/InitState.ts";
export interface RooterReducerProps{
    app:IState
}
const rootReducer = combineReducers({
    app:AppReducer,
});
const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof  rootReducer>;

export default store;

