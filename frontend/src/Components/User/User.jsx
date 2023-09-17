import React from 'react'
// import '../Components/Home/Home.css';
// import '../Home/Home.css';
import {Link} from 'react-router-dom';
import { Typography } from '@mui/material';

const User = ({userId,name,avatar}) => {
  return (
    <Link to={`/user/${userId}`} className='homeUser'>
    <img src={avatar} alt={name}/>
    <Typography variant='h6'>{name}</Typography>
    </Link>
  )
}

export default User
