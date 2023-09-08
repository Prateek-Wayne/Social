import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import Home from './Components/Home/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//custome theme for app
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#B7B4B7',
    },
    secondary: {
      main: '#087A8F',
    },
  },
});
function App() {
  
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const {isAuthenticated} =useSelector(state=>state.user);

  return (
    <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
    <div className="App">
    </div>
      {isAuthenticated && <Header />}
    <Routes>
      <Route path="/" element={isAuthenticated?<Home/>:<Login/>} />
    </Routes>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
