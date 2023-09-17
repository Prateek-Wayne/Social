import {configureStore} from '@reduxjs/toolkit';
import { PostOfFollowingReducer, allUsersReducer, searchUsersReducer, userProfileReducer, userReducer } from './Reducers/User';
import { likeReducer, myPostsReducer, userPostReducer } from './Reducers/Post';

const store=configureStore({
    reducer:{
        user:userReducer,
        postOfFollowing:PostOfFollowingReducer,
        allUsers:allUsersReducer,
        searchUser:searchUsersReducer,
        like:likeReducer,
        myPost:myPostsReducer,
        userProfile:userProfileReducer,
        userPosts:userPostReducer
    } // Reducer
});
export default store;
