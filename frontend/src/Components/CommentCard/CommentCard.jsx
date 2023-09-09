import React from 'react'
import './CommentCard.css'
import { Link } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCommentOnPost } from '../../Actions/Post'

const CommentCard = ({
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
    isAccount 
}) => {

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const delteCommentHandler = () => {
        console.log("Delte kardo mujhe  ");
        dispatch(deleteCommentOnPost(commentId))
    }
  return (
    <div className='"commentUser'>
        <Link to={`/user/${userId}`} >
            <img src={avatar} alt={name}/>
            <Typography style={{minWidth:"6vmax"}}>{name}</Typography>
        </Link>
        <Typography style={{minWidth:"6vmax"}}>{comment}</Typography>
        {
            isAccount||userId===user._id?<Button onClick={delteCommentHandler}>
            <Delete/>
        </Button>:null
        }
    </div>
  )
}

export default CommentCard
