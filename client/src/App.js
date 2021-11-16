import React from "react";

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
      <div className="App">
        <h1>Hello World!</h1>
      </div>
    </ApolloProvider>
    
  );
}

export default App;
