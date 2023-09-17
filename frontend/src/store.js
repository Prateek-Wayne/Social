import {configureStore} from '@reduxjs/toolkit';
import { PostOfFollowingReducer, allUsersReducer, userProfileReducer, userReducer } from './Reducers/User';
import { likeReducer, myPostsReducer, userPostReducer } from './Reducers/Post';

const store=configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:PostOfFollowingReducer,
        allUsers:allUsersReducer,
        like:likeReducer,
        myPost:myPostsReducer,
        userProfile:userProfileReducer,
        userPosts:userPostReducer
    } // Reducer
});
export default store;
