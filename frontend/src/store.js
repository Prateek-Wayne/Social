import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './Reducers/User';

// const intitalState={};

const store=configureStore({
    reducer:{
        user:userReducer,
    } // Reducer
});
export default store;
