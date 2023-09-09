import {configureStore} from '@reduxjs/toolkit';
import { PostOfFollowingReducer, allUsersReducer, userReducer } from './Reducers/User';


const store=configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:PostOfFollowingReducer,
        allUsers:allUsersReducer
    } // Reducer
});
export default store;
