import React, { useEffect } from 'react';
import './Home.css';
import User from '../User/User';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getFollowingPost } from '../../Actions/User';
import Loader from '../Loader/Loader';
import { Typography } from '@mui/material';
import { toast } from 'react-hot-toast';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector(state => state.postOfFollowing);
  const { allUsers, loading: loadingUser } = useSelector(state => state.allUsers);
  const {error:likeError,post}=useSelector(state=>state.like);
  useEffect(() => {
    dispatch(getFollowingPost());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(()=>{
    if(likeError){
        toast.error(likeError);
        dispatch({type:'clearError'})
    }
    if(error){
        toast.error(error);
        dispatch({type:'clearError'})
    }
    if(post){
        toast.success(post);
        dispatch({type:'clearMessage'})
    }
},[likeError,post,dispatch,error]);

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
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}

              />
            )
          }) : <Typography variant='h6'>No Posts 😔 </Typography>
        }

      </div>
      <div className='homeright'>
        {
          allUsers && allUsers.length > 0 ? allUsers.map((user) => {
            return (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url} />
            )
          }) : <Typography variant='h6'>No Users 😔 </Typography>
        }
      </div>

    </div>);
}

export default Home
