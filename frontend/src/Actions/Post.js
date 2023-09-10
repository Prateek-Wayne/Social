import axios from "axios";


export const likePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'likeRequest'
        });
        const { data } = await axios.get(`api/v1/post/${id}`);
        dispatch({
            type: 'likeSuccess',
            payload: data.message
        });
    }
    catch (error) {
        dispatch({
            type: 'likeFailure',
            payload: error.response.data.message
        });
    };
};
export const addCommentOnPost = (id, comment) => async (dispatch) => {
    try {
        dispatch({
            type: 'addCommentRequest'
        });
        const { data } = await axios.post(
            `/api/v1/post/comment/${id}`,
            {
                comment,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        dispatch({
            type: 'addCommentSuccess',
            payload: data.message
        });
    }
    catch (error) {
        dispatch({
            type: 'addCommentFailure',
            payload: error.response.data
        });
    };
};
export const deleteCommentOnPost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: 'deleteCommentRequest'
        });
        const { data } = await axios.post(
            `/api/v1/post/delete/${id}`
        );
        dispatch({
            type: 'deleteCommentSuccess',
            payload: data.message
        });
    }
    catch (error) {
        dispatch({
            type: 'deleteCommentFailure',
            payload: error.response.data
        });
    };
};
export const createNewPost = (caption,image) => async (dispatch) => {
    try {
        dispatch({
            type: 'newPostRequest'
        });
        const { data } = await axios.post(
            `/api/v1/post/delete/${id}`
        );
        dispatch({
            type: 'newPostSuccess',
            payload: data.message
        });
    }
    catch (error) {
        dispatch({
            type: 'newPostFailure',
            payload: error.response.data
        });
    };
};
