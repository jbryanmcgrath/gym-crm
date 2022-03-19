import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignInAndCreateUserContainer from './components/SignInAndCreateUserContainer';
import { GlobalProvider } from './store/GlobalProvider';
import CustomerTable from './components/CustomerTable'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';


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
  return (
    <div className={classes.root}>
      <ApolloProvider client={client}>
        <GlobalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login-signup" element={<SignInAndCreateUserContainer />} />
              <Route path="/members" element={<CustomerTable />} />
              <Route path ="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </ApolloProvider>
    </div>
  );
}