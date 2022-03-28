import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import SignInAndCreateUserContainer from "./components/SignInAndCreateUserContainer";
import { GlobalProvider } from "./store/GlobalProvider";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Dashboard from "./pages/Dashboard";

import AddMember from "./pages/AddMember";
import AuthService from "./utils/auth";
import AddEmployee from "./pages/AddEmployee";
import ViewMembers from "./pages/ViewMembers";
import GymInfo from "./components/GymInfo";
import UserAnalysis from "./components/UserAnalysis";
import MemberCheckin from "./components/MemberCheckin";
import ViewEmployee from "./pages/ViewEmployee";
import Scheduler from "./components/Scheduler";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/images/gym-crm.jpg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: " fixed ",
  },
}));

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

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
              <Route
                path="/login-signup"
                element={<SignInAndCreateUserContainer />}
              />
              <Route path="gym-info" element={<GymInfo />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/members" element={<ViewMembers />} />
              <Route path="/scheduler" element={<Scheduler />} />
              <Route path="/employees" element={<ViewEmployee />} />
              <Route path="/add-members" element={<AddMember />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/user-analysis" element={<UserAnalysis />} />
              <Route path="/member-checkin" element={<MemberCheckin />} />
            </Routes>
          </BrowserRouter>
        </GlobalProvider>
      </ApolloProvider>
    </div>
  );
}
