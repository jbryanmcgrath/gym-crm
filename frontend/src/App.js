import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Home from './pages/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SignInAndCreateUserContainer from './components/SignInAndCreateUserContainer';
import { GlobalProvider } from './store/GlobalProvider';
import CustomerTable from './components/CustomerTable'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


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
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ApolloClient client={client}>
        <GlobalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login-signup" element={<SignInAndCreateUserContainer />} />
              <Route path="/members" element={<CustomerTable />} />
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
        <ApolloClient />
    </div>
  );
}