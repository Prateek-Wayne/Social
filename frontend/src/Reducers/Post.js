import { createReducer } from '@reduxjs/toolkit'

const initialState = {}
export const likeReducer = createReducer(initialState, {
    likeRequest: (state) => {
        state.loading = true;
    },
    likeSuccess: (state, action) => {
        state.loading = false;
        state.post = action.payload;
    },
    likeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    addCommentRequest: (state) => {
        state.loading = true;
    },
    addCommentSuccess: (state, action) => {
        state.loading = false;
        state.post = action.payload;
    },
    addCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    newPostRequest: (state) => {
        state.loading = true;
    },
    newPostSuccess: (state, action) => {
        state.loading = false;
        state.post = action.payload;
    },
    newPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    deleteCommentRequest: (state) => {
        state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.post = action.payload;
    },
    deleteCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    }
});

export const myPostsReducer = createReducer(initialState, {
    myPostsRequest: (state) => {
        state.loading = true;
    },
    myPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
    },
    myPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null;
    },
});
