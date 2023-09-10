import {configureStore} from '@reduxjs/toolkit';
import { PostOfFollowingReducer, allUsersReducer, userReducer } from './Reducers/User';
import { likeReducer, myPostsReducer } from './Reducers/Post';

const store=configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:PostOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
        myPost:myPostsReducer
    } // Reducer
});
export default store;
