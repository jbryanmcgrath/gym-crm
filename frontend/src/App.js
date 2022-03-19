import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import { Routes, Route, BrowserRouter } from 'react-router-dom';
=======
import Home from './pages/Home';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
>>>>>>> 6160e809fac624dda0ec6dec0551680b63db2b3c
import SignInAndCreateUserContainer from './components/SignInAndCreateUserContainer';
import { GlobalProvider } from './store/GlobalProvider';
import CustomerTable from './components/CustomerTable'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
<<<<<<< HEAD
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
=======
import Dashboard from './pages/Dashboard';
import NewMember from './components/NewMember';
import AddMember from './pages/AddMember';
import AuthService from './utils/auth'
>>>>>>> 6160e809fac624dda0ec6dec0551680b63db2b3c


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

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default function App() {
  const classes = useStyles();
  const loggedIn = AuthService.loggedIn();
  return (
    <div className={classes.root}>
      <ApolloProvider client={client}>
        <GlobalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login-signup" element={<SignInAndCreateUserContainer />} />
              <Route path="/members" element={<CustomerTable />} />
<<<<<<< HEAD
              <Route path ="/dashboard" element={<Dashboard />} />
=======
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-members" element={<AddMember />} />
>>>>>>> 6160e809fac624dda0ec6dec0551680b63db2b3c
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </ApolloProvider>
    </div>
  );
}