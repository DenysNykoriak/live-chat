import { Dispatch } from "react";
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { chatActionType, chatReducer } from "./reducers/chatReducer";

const reducers = combineReducers({
    chat: chatReducer
});

export const store = createStore(reducers, composeWithDevTools() );

export type RootState = ReturnType<typeof store.getState>

export type Action = chatActionType;

export type AppDispatch = typeof store.dispatch;