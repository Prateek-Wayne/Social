import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import { Home } from '@mui/icons-material';


function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const {isAuthenticated} =useSelector(state=>state.user);

  return (
    <BrowserRouter>
    <div className="App">
    </div>
      {isAuthenticated && <Header />}
    <Routes>
      <Route path="/" element={isAuthenticated?<Home/>:<Login/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
