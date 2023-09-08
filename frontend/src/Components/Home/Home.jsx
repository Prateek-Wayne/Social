import React from 'react';
import './Home.css';
import User from '../User/User';
const Home = () => {
  return (
    <div className='home'>
      <div className='homeleft'>
      </div>
      <div className='homeright'>
        <User 
          userId={"user._id"}
          name={"user.name"}
          avatar={"https://wallpapers.com/cool-profile-pictures"}/>
        <User 
          userId={"user._id"}
          name={"user.name"}
          avatar={"https://wallpapers.com/cool-profile-pictures"}/>
        <User 
          userId={"user._id"}
          name={"user.name"}
          avatar={"https://wallpapers.com/cool-profile-pictures"}/>
      </div>
      
    </div>
  )
}

export default Home
