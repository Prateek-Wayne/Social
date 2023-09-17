import React, { useEffect } from 'react'
import './Post.css';
import { Link } from 'react-router-dom';
import { Avatar, Typography, Button, Dialog } from '@mui/material';
import { MoreVert, Favorite, FavoriteBorder, ChatBubbleOutline, DeleteOutline } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost, updatePost } from '../../Actions/Post';
import { getFollowingPost, getMyPosts, loadUser } from '../../Actions/User';
import User from '../User/User';
import { addCommentOnPost } from '../../Actions/Post';
import CommentCard from '../CommentCard/CommentCard';
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
    const [captionToggle, setCaptionToggle] = React.useState(false);
    const [captionValue, setCaptionValue] = React.useState(commentValue);
    const { user } = useSelector(state => state.user);
    const handleLike = async () => {
        setLiked(!liked);
        await dispatch(likePost(postId));
        if (isAccount) {
            dispatch(getMyPosts());
        }
        else {
            dispatch(getFollowingPost());
        }
    }
    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue));
        if (isAccount) {

        }
        else {
            dispatch(getFollowingPost());
        }
        setCommentValue('');
    }
    const updateCaptionHandler = (e) => {
        e.preventDefault();
        dispatch(updatePost(captionValue, postId));
        dispatch(getMyPosts());
    };
    const deletePostHandler = () => {
        console.log("Delete Post");
        dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser());
    };
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
                {isAccount ? <Button onClick={()=>{setCaptionToggle(!captionToggle)}}><MoreVert /> </Button> : null}
                <img src={postImage} alt="Post" style={{ objectFit: 'cover', width: '100%', height: 'auto' }} />

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
                <Button onClick={() => { setCommentToggle(!commentToggle) }}>
                    <ChatBubbleOutline />
                </Button>
                {
                    isDelete ? <Button onClick={deletePostHandler}>
                        <DeleteOutline />
                    </Button> : null
                }
            </div>
            {
                likes && likes.length > 0 ? <Dialog open={likesUser}
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
                </Dialog> : null
            }
            <Dialog open={commentToggle}
                onClose={() => setCommentToggle(!commentToggle)}>
                <div className='DialogBox'>
                    <Typography variant='h6'>Comments</Typography>
                    <form className='commentForm' onSubmit={addCommentHandler}>
                        <input type='text' placeholder='Comment Here' value={commentValue} required onChange={(e) => { setCommentValue(e.target.value) }} />
                        <Button type='submit'>Add</Button>
                    </form>
                    {
                        comments && comments.length > 0 ? comments.map((item) => {
                            return (
                                <CommentCard key={item._id} userId={item.user._id} name={item.user.name} comment={item.comment} commentId={item._id} postId={postId} isAccount={isAccount} />
                            );
                        }) : <Typography variant='h6'>No Comments</Typography>
                    }
                </div>
            </Dialog>
            <Dialog open={captionToggle}
                onClose={() => setCaptionToggle(!captionToggle)}>
                <div className='DialogBox'>
                    <Typography variant='h6'>Update Comments</Typography>
                    <form className='commentForm' onSubmit={updateCaptionHandler}>
                        <input type='text'  value={captionValue} required onChange={(e) => { setCaptionValue(e.target.value) }} />
                        <Button type='submit'>Update</Button>
                    </form>

                </div>
            </Dialog>

        </div>
    )
};

export default Post;
