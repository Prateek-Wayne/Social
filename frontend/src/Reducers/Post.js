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
    clearError:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    }
 })