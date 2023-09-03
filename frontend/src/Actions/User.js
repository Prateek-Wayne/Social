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