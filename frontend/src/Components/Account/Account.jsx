import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts, logoutUser } from '../../Actions/User';
import Loader from '../Loader/Loader';
import { toast } from 'react-hot-toast';
import './Account.css'
import Post from '../Post/Post';
import { Avatar, Typography,Button, Dialog } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../User/User';
const Account = () => {
    const dispatch = useDispatch();
    const {user}=useSelector(state=>state.user);
    const {loading,error,posts} = useSelector(state => state.myPost);
    const {error:likeError,post}=useSelector(state=>state.like);

    const [followerToggle, setFollowerToggle] = React.useState(false);
    const [followingToggle, setFollowingToggle] = React.useState(false);

    const logoutHandler=async ()=>{
        await dispatch(logoutUser());
        toast.success("Logged Out Successfully");
    }
    // console.log("Inside Account ",user);
    useEffect(() => {
        dispatch(getMyPosts());
    },[dispatch]);

    useEffect(()=>{
        if(likeError){
            toast.error(likeError);
            dispatch({type:'clearError'})
        }
        if(post){
            toast.success(post);
            dispatch({type:'clearMessage'})
        }
    },[likeError,post,dispatch]);

  return loading?<Loader/>:
  (
    <div className='account'>
      <div className='accountleft'>
      {
          posts && posts.length > 0 ? posts.map((post) => {
              return (
                <Post key={post._id}
                postId={post._id}
                caption={post.caption}
                postImage={post.photo}
                likes={post.likes}
                comments={post.Comments}
                // ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
              />
            )
          }) : <Typography variant='h6'>No Posts 😔 </Typography>
        }
    </div>
    <div className='accountright'>
        <Avatar
            src={user.avatar.url}
            sx={{ width: '8vmax', height: '8vmax' }}  
        />  
        <Typography variant='h6'>{user.name}</Typography>
        <div>
            <Button onClick={()=>{setFollowerToggle(!followerToggle)}}>
                <Typography>Followers</Typography>
            </Button>
            <Typography>{user.followers.length}</Typography>
        </div>
        <div>
            <Button onClick={()=>{setFollowingToggle(!followingToggle)}}>
                <Typography>Following</Typography>
            </Button>
            <Typography>{user.following.length}</Typography>
        </div>
        <div>
            <Button>
                <Typography>Posts</Typography>
            </Button>
            <Typography>{user.posts.length}</Typography>
        </div>
        <Button variant='contained' onClick={logoutHandler} >Logout</Button>
        <Link to='/updatePassword' >Edit Profile</Link>
        <Link to='/updateUserProfile' >Change Password</Link>
        <Button>
            Delete My Profile
        </Button>

        <Dialog  open={followerToggle}
                onClose={() => setFollowerToggle(!followerToggle)}>
                <div className='DialogBox'>
                    <Typography variant='h6'>Followers</Typography>
                    {
                        user&&user.followers.length>0?user.followers.map((user)=>{
                            return(
                                <User
                                    key={user._id}
                                    userId={user._id}
                                    name={user.name}
                                    avatar={"https://mui.com/static/images/cards/paella.jpg"} />
                            )
                        }):<Typography>You have no Followers</Typography>
                    }


                </div>
            </Dialog>
        <Dialog  open={followingToggle}
                onClose={() => setFollowingToggle(!followingToggle)}>
                <div className='DialogBox'>
                    <Typography variant='h6'>Following</Typography>
                    {
                        user&&user.following.length>0?user.following.map((user)=>{
                            return(
                                <User
                                    key={user._id}
                                    userId={user._id}
                                    name={user.name}
                                    avatar={"https://mui.com/static/images/cards/paella.jpg"} />
                            )
                        }):<Typography>You are not Following any one</Typography>
                    }
                </div>
            </Dialog>

    </div>
    </div>
  )
}

export default Account
