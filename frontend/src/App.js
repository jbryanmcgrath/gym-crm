import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Home from './pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignInAndCreateUserContainer from './components/SignInAndCreateUserContainer';
import { GlobalProvider } from './store/GlobalProvider';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/gym-crm.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: ' fixed '
  },
}));
export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login-signup" element={<SignInAndCreateUserContainer />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}