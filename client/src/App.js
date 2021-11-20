import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/LoginForm"

//necessary imports for graphql
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

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
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <Navbar />

          {/*switch with routing / = homepage /me = dashboard /singlepost = individual snippet /usersinglepost = user indivudal snippet*/}
        <Routes>
          
          <Route exact path='/' element={<Homepage/>} />

          <Route exact path="/me" element={<Dashboard/>} /> 

          <Route exact path="/login" element={<Login/>} /> 
          
        </Routes>

      </>
      </Router>
      
    </ApolloProvider>
    
  );
}

export default App;
