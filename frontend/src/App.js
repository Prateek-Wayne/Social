import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import Home from './Components/Home/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
//custome theme for app
const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#585758',
    },
    secondary: {
      main: '#ebfffe',
      dark: '#053847'
    },
  },
});
function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const { isAuthenticated } = useSelector(state => state.user);

  return (
    <ThemeProvider theme={darkTheme}>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <BrowserRouter>

        <div className="App">
        </div>
        {isAuthenticated && <Header />}
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        </Routes>
      </BrowserRouter>

    </ThemeProvider>
  );
}

export default App;
