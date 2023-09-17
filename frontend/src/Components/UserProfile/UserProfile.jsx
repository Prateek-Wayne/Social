import React, { useEffect, useState } from 'react';
import '../Home/Home.css';
import User from '../User/User';
import Post from '../Post/Post';
import Loader from '../Loader/Loader';
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import  toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { followAndUnfollowUser, getUserPosts, getUserProfile } from '../../Actions/User';
import { useParams } from "react-router-dom";


const UserProfile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user: me } = useSelector((state) => state.user);
  // console.log("Inside UserProfile.jsx", me);
  const { loading, posts, error } = useSelector(state => state.userPosts);
  const { loading: loadingUser, allUsers,error:userError } = useSelector(state => state.userProfile);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);
  // console.log("Inside UserProfile.jsx", allUsers);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(allUsers.user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }
    if (allUsers) {
      allUsers.user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [me._id, params.id]);

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      toast.error(followError);
      dispatch({ type: "clearErrors" });
    }

    if (userError) {
      toast.error(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [toast, error, message, followError, userError, dispatch]);

  return loading || loadingUser ? (<Loader />) :
    (<div className='home'>
      <div className='homeleft'>
        {
          posts && posts.length > 0 ? posts.map((post) => {
            return (
              <Post key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.image.url}
                likes={post.likes}
                comments={post.Comments}
                ownerImage={allUsers.user.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}

              />
            )
          }) : <Typography variant='h6'>No Posts 😔 </Typography>
        }

      </div>
      <div className="accountright">
        {allUsers && (
          <>
            <Avatar
              src={allUsers.user.avatar.url}
              sx={{ height: "8vmax", width: "8vmax" }}
            />

            <Typography variant="h5">{allUsers.user.name}</Typography>

            <div>
              <button
                onClick={() => setFollowersToggle(!followersToggle)}
              >
                <Typography>Followers</Typography>
              </button>
              <Typography>{allUsers.user.followers.length}</Typography>
            </div>

            <div>
              <button
                onClick={() => setFollowingToggle(!followingToggle)}
              >
                <Typography>Following</Typography>
              </button>
              <Typography>{allUsers.user.following.length}</Typography>
            </div>

            <div>
              <Typography>Posts</Typography>
              <Typography>{allUsers.user.posts.length}</Typography>
            </div>
            {myProfile ? null : (
              <Button
                variant="contained"
                style={{ background: following ? "red" : "" }}
              onClick={followHandler}
              disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>

            {allUsers && allUsers.user.followers.length > 0 ? (
              allUsers.user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>
        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>

            {allUsers && allUsers.user.following.length > 0 ? (
              allUsers.user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You're not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>

    </div>);
}

export default UserProfile;
