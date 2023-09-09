import {createReducer} from '@reduxjs/toolkit'

const initialState={}
 export const likeReducer=createReducer(initialState,{
    likeRequest:(state)=>{
        state.loading=true;
    },
    likeSuccess:(state,action)=>{
        state.loading=false;
        state.post=action.payload;
    },
    likeFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    addCommentRequest:(state)=>{
        state.loading=true;
    },
    addCommentSuccess:(state,action)=>{
        state.loading=false;
        state.post=action.payload;
    },
    addCommentFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    deleteCommentRequest:(state)=>{
        state.loading=true;
    },
    deleteCommentSuccess:(state,action)=>{
        state.loading=false;
        state.post=action.payload;
    },
    deleteCommentFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    clearError:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    }
 })