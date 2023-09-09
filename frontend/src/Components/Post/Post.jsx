import React from 'react'
import './Post.css';
import { Link } from 'react-router-dom';
import { Avatar, Typography, Button } from '@mui/material';
import { MoreVert, Favorite, FavoriteBorder, ChatBubbleOutline, DeleteOutline } from '@mui/icons-material';

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

        const [liked, setLiked] = React.useState(false);
        const handleLike=()=>{
            setLiked(!liked);
        }

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
            <Button>
                <Typography color='primary' >{likes.length} Likes</Typography>
            </Button>
            <div className='postFooter'>
                <Button onClick={handleLike}>
                    {liked ? <Favorite sx={{color:'red'}}/> : <FavoriteBorder sx={{color:'red'}} />}
                </Button>
                <Button>
                    <ChatBubbleOutline />
                </Button>
                {
                    isDelete?<Button>
                    <DeleteOutline />
                </Button>:null
                }
            </div>
        </div>
    )
};

export default Post;
