import { Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './NewPost.css'
import {toast} from 'react-hot-toast'
import { createNewPost } from '../../Actions/Post'

const NewPost = () => {
    const[caption,setCaption]=React.useState('');
    const [image,setImage]=React.useState(null);
    const {loading,error,message} =useSelector(state=>state.like);
    const dispatch=useDispatch();

    const handleImageChange=(e)=>{
        const file=e.target.files[0];
        const Reader=new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload=()=>{
            if(Reader.readyState===2){
                setImage(Reader.result)
            }
        }
        console.log("inside image handler", image);
    };

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(createNewPost(caption,image));
    }

    useEffect(()=>{
        if(error)
        {
            toast.error(error);
            dispatch({type:"clearErrors"});
        }
        if(message)
        {
            toast.success(error);
            dispatch({type:"clearMessage"});
        }
    },[dispatch,error,message]);

    return (
        <div className='newPost'>
            <form className='newPostForm' onSubmit={submitHandler} >
                <Typography variant='h3'>New Post</Typography>
                {image && <img src={image} alt='Post Image' />}
                <input type='file' placeholder='Upload Image' onChange={handleImageChange} />
                <input type='text' placeholder='Caption' onChange={(e)=>{setCaption(e.target.value)}} />
                <Button disabled={loading} type='submit'>Post</Button>
            </form>
        </div>
    )
}

export default NewPost;
