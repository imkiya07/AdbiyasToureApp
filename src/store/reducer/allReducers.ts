import {combineReducers} from '@reduxjs/toolkit';
import {isLoggedReducer} from './authStatus';
import {counterReducer} from './counter';

export const allReducers = combineReducers({counterReducer, isLoggedReducer});
