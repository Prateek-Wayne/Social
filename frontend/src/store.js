import {configureStore} from '@reduxjs/toolkit';
import { PostOfFollowingReducer, allUsersReducer, userReducer } from './Reducers/User';
import { likeReducer } from './Reducers/Post';

const store=configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:PostOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
    } // Reducer
});
export default store;
