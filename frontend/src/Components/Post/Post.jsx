import React, { useEffect } from 'react'
import './Post.css';
import { Link } from 'react-router-dom';
import { Avatar, Typography, Button, Dialog } from '@mui/material';
import { MoreVert, Favorite, FavoriteBorder, ChatBubbleOutline, DeleteOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../Actions/Post';
import { getFollowingPost } from '../../Actions/User';
import User from '../User/User';

const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false }) => {
    const dispatch = useDispatch();
    const [liked, setLiked] = React.useState(false);
    const [likesUser, setLikesUser] = React.useState(false);
    const [commentToggle, setCommentToggle] = React.useState(false);
    const [commentValue, setCommentValue] = React.useState('');
    const { user } = useSelector(state => state.user);
    const handleLike = async () => {
        setLiked(!liked);
        await dispatch(likePost(postId));
        if (isAccount) {

        }
        else {
            dispatch(getFollowingPost());
        }
    }
    const addCommentHandler=()=>{
        console.log("Add comment");
    }
    useEffect(() => {
        likes.forEach((item) => {
            if (item._id === user._id) {
                setLiked(true);
            }
        })
    }, [likes, user]);

    return (
        <div className='post'>
            <div className='postHeader'>
                {isAccount ? <Button><MoreVert /> </Button> : null}
                <img src={postImage} alt="Post" />
            </div>
            <div className='postDetails'>
                <Avatar src={ownerImage} alt="Home" sx={{
                    height: '3vmax',
                    width: '3vmax',
                }} />
                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700}>{ownerName}</Typography>
                </Link>
                <Typography
                    fontWeight={100}
                    color='rgba(0,0,0,0.582)'
                    style={{ alignSelf: 'center' }}
                >
                    {caption}
                </Typography>
            </div>
            <Button onClick={() => { setLikesUser(!likesUser) }}>
                <Typography color='primary' >{likes.length} Likes</Typography>
            </Button>
            <div className='postFooter'>
                <Button onClick={handleLike}>
                    {liked ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder sx={{ color: 'red' }} />}
                </Button>
                <Button onClick={()=>{setCommentToggle(!commentToggle)}}>
                    <ChatBubbleOutline />
                </Button>
                {
                    isDelete ? <Button>
                        <DeleteOutline />
                    </Button> : null
                }
            </div>
            {
                likes&& likes.length > 0 ? <Dialog open={likesUser}
                onClose={() => setLikesUser(!likesUser)}>
                <div className='DialogBox'>
                    <Typography variant='h6'>Liked By</Typography>
                    {
                        likes.map((user) => {
                            return (
                                <User
                                    key={user._id}
                                    userId={user._id}
                                    name={user.name}
                                    avatar={"https://mui.com/static/images/cards/paella.jpg"} />
                            )
                        })
                    }
                </div>
            </Dialog>:null
            }
             <Dialog open={commentToggle}
                onClose={() => setCommentToggle(!commentToggle)}>
                <div className='DialogBox'>
                    <Typography variant='h6'>Comments</Typography>
                    <form className='commentForm' onSubmit={addCommentHandler}>
                    <input type='text' placeholder='Comment Here' value={commentValue} required onChange={(e) => { setCommentValue(e.target.value) }} />
                    <Button type='submit'>Add</Button>
                    </form>
                </div>
            </Dialog>
           
        </div>
    )
};

export default Post;
