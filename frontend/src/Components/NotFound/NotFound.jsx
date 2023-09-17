import React from 'react';
import notFoundImage from './404.png'; // 
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      {/* <img src={notFoundImage} alt="Not found" /> */}
      <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Button variant="contained" color="primary" component={Link} to="/">
        Take me Back
      </Button>
    </div>
  )
}

export default NotFound;
