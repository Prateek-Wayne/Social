import axios from 'axios';


export const loginUser = (email, password) => async (dispatch) => {
    try {
        //first dispatch Login request to reducer(loading: true)
        dispatch({
             type: 'LoginRequest' 
        }
        );
        const {data}=await axios.post('/api/v1/login',{email,password},
        {
            headers:{
                'Content-Type':'application/json'
            }
        });
        //second dispatch Login success to reducer(loading: false, user: data)
        dispatch({
            type: 'LoginSuccess',
            payload: data.user,
        });


    } catch (error) {
        //third dispatch Login failure to reducer(loading: false, error: error)
        dispatch({
            type: 'LoginFailure',
            payload: error.response.data.message,
        });
    }
};

export const registerUser = (name,email, password,avatar) => async (dispatch) => {
    try {
        //first dispatch Login request to reducer(loading: true)
        dispatch({
             type: 'RegisterRequest' 
        }
        );
        const {data}=await axios.post('/api/v1/register',{name,email,password,avatar},
        {
            headers:{
                'Content-Type':'application/json'
            }
        });
        //second dispatch Login success to reducer(loading: false, user: data)
        dispatch({
            type: 'RegisterSuccess',
            payload: data.user,
        });


    } catch (error) {
        //third dispatch Login failure to reducer(loading: false, error: error)
        dispatch({
            type: 'RegisterFailure',
            payload: error.response.data.message,
        });
    }
};
export const loadUser = () => async (dispatch) => {
    try {
        //first dispatch Login request to reducer(loading: true)
        dispatch({
             type: 'LoadUserRequest' 
        }
        );
        const {data}=await axios.get('/api/v1/myProfile');
        //second dispatch Login success to reducer(loading: false, user: data)
        dispatch({
            type: 'LoadUserSuccess',
            payload: data.user,
        });


    } catch (error) {
        //third dispatch Login failure to reducer(loading: false, error: error)
        dispatch({
            type: 'LoadUserFailure',
            payload: error.response.data.message,
        });
    }
};

export const getFollowingPost=()=>async(dispatch)=>{
    try{
        dispatch({
            type:'postOfFollowingRequest'
        });
        const {data}=await axios.get("api/v1/posts");
        dispatch({
            type:'postOfFollowingSuccess',
            payload:data.posts
        });
    }
    catch(error){
        dispatch({
            type:'postOfFollowingFailure',
            payload:error.response.data.message
        });
    };
};
export const getAllUsers=()=>async(dispatch)=>{
    try{
        dispatch({
            type:'allUsersRequest'
        });
        const {data}=await axios.get("api/v1/users");
        dispatch({
            type:'allUsersSuccess',
            payload:data.user
        });
    }
    catch(error){
        dispatch({
            type:'allUsersFailure',
            payload:error.response.data.message
        });
    };
};

export const getMyPosts=()=>async(dispatch)=>{
    try{
        dispatch({
            type:'myPostsRequest'
        });
        const {data}=await axios.get("api/v1/myProfile");
        dispatch({
            type:'myPostsSuccess',
            payload:data.user.posts
        });
    }
    catch(error){
        dispatch({
            type:'myPostsFailure',
            payload:error.response.data.message
        });
    };
};


export const logoutUser = () => async (dispatch) => {
    try {
        //first dispatch Login request to reducer(loading: true)
        dispatch({
             type: 'LogoutRequest' 
        }
        );
        const {data}=await axios.post('/api/v1/logout');
        //second dispatch Login success to reducer(loading: false, user: data)
        dispatch({
            type: 'LogoutSuccess'
        });


    } catch (error) {
        //third dispatch Login failure to reducer(loading: false, error: error)
        dispatch({
            type: 'LogoutFailure',
            payload: error.response.data.message,
        });
    }
};