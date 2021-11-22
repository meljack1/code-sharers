//Ract Imports
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//Apollo Imports
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
//Component Imports
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/LoginForm"
import CodePage from "./pages/CodePage";
import UserCodePage from "./pages/UserCodePage";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./assets/css/borderBox.css";
import './assets/css/fonts.css';


const httpLink = createHttpLink({
  uri: "/graphql"
})

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("id_token");

  return{
    headers: {
      headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  const THEME = createTheme({
    palette: {
      primary: {
        main: '#000000',
        contrastText: '#10BF1A',
      },
      secondary: {
        main: '#f50057',
      },
    },
    typography: {
      "fontFamily": "DM Sans",
      h1: {
        fontFamily: `'Major Mono Display', monospace`,
        fontWeight: "bold"
      },
    }
  })

  return (
    <ThemeProvider theme={THEME}>
    <ApolloProvider client={client}>
      <Router>
        <>
        <Navbar />

          {/*switch with routing / = homepage /me = dashboard /singlepost = individual snippet /usersinglepost = user indivudal snippet*/}
        <Routes>
          
          <Route exact path='/' element={<Homepage/>} />

          <Route exact path="/me" element={<Dashboard/>} /> 

          <Route exact path="/login" element={<Login/>} /> 

          <Route exact path="/:id" element={<CodePage/>} />

          <Route exact path="/me/:id" element={<UserCodePage/>} />

        </Routes>

      </>
      </Router>
      
    </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
