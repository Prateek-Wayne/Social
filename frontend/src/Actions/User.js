import axios from 'axios';


export const loginUser = (email, password) => async (dispatch) => {
  try {
    //first dispatch Login request to reducer(loading: true)
    dispatch({
      type: 'LoginRequest'
    }
    );
    const { data } = await axios.post('/api/v1/login', { email, password },
      {
        headers: {
          'Content-Type': 'application/json'
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

export const registerUser = (name, email, password, avatar) => async (dispatch) => {
  try {
    //first dispatch Login request to reducer(loading: true)
    dispatch({
      type: 'RegisterRequest'
    }
    );
    const { data } = await axios.post('/api/v1/register', { name, email, password, avatar },
      {
        headers: {
          'Content-Type': 'application/json'
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
    const { data } = await axios.get('/api/v1/myProfile');
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

export const getFollowingPost = () => async (dispatch) => {
  try {
    dispatch({
      type: 'postOfFollowingRequest'
    });
    const { data } = await axios.get("api/v1/posts");
    dispatch({
      type: 'postOfFollowingSuccess',
      payload: data.posts
    });
  }
  catch (error) {
    dispatch({
      type: 'postOfFollowingFailure',
      payload: error.response.data.message
    });
  };
};
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: 'allUsersRequest'
    });
    const { data } = await axios.get("api/v1/users");
    dispatch({
      type: 'allUsersSuccess',
      payload: data.user
    });
  }
  catch (error) {
    dispatch({
      type: 'allUsersFailure',
      payload: error.response.data.message
    });
  };
};
export const searchUsers = (name) => async (dispatch) => {
  try {
    dispatch({
      type: 'searchUsersRequest'
    });
    const { data } = await axios.get(`/api/v1/users?name=${name}`);
    dispatch({
      type: 'searchUsersSuccess',
      payload: data.user
    });
  }
  catch (error) {
    dispatch({
      type: 'searchUsersFailure',
      payload: error.response.data.message
    });
  };
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: 'myPostsRequest'
    });
    const { data } = await axios.get("api/v1/myProfile");
    dispatch({
      type: 'myPostsSuccess',
      payload: data.user.posts
    });
  }
  catch (error) {
    dispatch({
      type: 'myPostsFailure',
      payload: error.response.data.message
    });
  };
};
export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostRequest",
    });

    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch({
      type: "userPostSuccess",
      payload: data.user.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostFailure",
      payload: error.response.data.message,
    });
  }
};
export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });

    const { data } = await axios.get(`/api/v1/user/${id}`);
    dispatch({
      type: "userProfileSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};
export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });

    const { data } = await axios.get(`/api/v1/follow/${id}`);
    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};



export const logoutUser = () => async (dispatch) => {
  try {
    //first dispatch Login request to reducer(loading: true)
    dispatch({
      type: 'LogoutRequest'
    }
    );
    const { data } = await axios.post('/api/v1/logout');
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


export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProfileRequest",
    });

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { name, email, avatar },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateProfileFailure",
      payload: error.response.data.message,
    });
  }
};
export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({
      type: "updatePasswordRequest",
    });

    const { data } = await axios.post(
      "/api/v1/updatePassword",
      { oldPassword, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updatePasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updatePasswordFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProfileRequest",
    });

    const { data } = await axios.delete(
      "/api/v1/deleteUser"
    );

    dispatch({
      type: "deleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await axios.post(
      "/api/v1/forgot/password", {
      email
    },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`, {
      password
    },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};
