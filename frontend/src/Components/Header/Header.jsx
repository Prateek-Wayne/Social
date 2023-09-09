import React, { useState } from 'react';
// import "./Header.css"
import { Link } from 'react-router-dom';
import {
    Home,
    HomeOutlined,
    Search,
    SearchOutlined,
    AccountCircle,
    AccountCircleOutlined
} from "@mui/icons-material";
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { AppBar, IconButton, Toolbar } from '@mui/material'

const Header = () => {
    const [tab, setTab] = useState(window.location.pathname);
    console.log(tab);

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'center' }}>
                {/* //Home Icon */}
                <IconButton  edge="start" color="inherit" aria-label="menu" sx={{ margin: 1 }}>
                    <Link to="/" onClick={() => { setTab("/") }}>
                        {tab === '/' ? <Home fontSize='large' style={{ color: '#087a8f' ,fontSize:40 }} /> : <HomeOutlined fontSize='large' style={{ color: '#ebfffe',fontSize:40  }} />}
                    </Link>
                </IconButton>
                {/* Add Icon */}
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ margin: 1 }}>
                    <Link to="/newpost" onClick={() => { setTab("/newpost") }}>
                        {tab === '/newpost' ? <AddBoxRoundedIcon fontSize='large' style={{ color: '#087a8f' }} /> : <AddBoxOutlinedIcon fontSize='large' style={{ color: '#ebfffe' }} />}
                    </Link>
                </IconButton>
                {/* //Search Icon */}
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ margin: 1 }}>
                    <Link to="/search" onClick={() => { setTab("/search") }}>
                        {tab === '/search' ? <Search fontSize='large' style={{ color: '#087a8f' }} /> : <SearchOutlined  style={{ color: '#ebfffe' }}fontSize='large'/>}
                    </Link>
                </IconButton>
                {/* // Account Icon */}
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ margin: 1 }}>
                    <Link to="/account" onClick={() => { setTab("/account") }}>
                        {tab === '/account' ? <AccountCircle fontSize='large' style={{ color: '#087a8f' }} /> : <AccountCircleOutlined fontSize='large' style={{ color: '#ebfffe' }} />}
                    </Link>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header
