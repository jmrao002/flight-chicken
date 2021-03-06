import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchRoutes from "./pages/SearchRoutes";
import SavedRoutes from "./pages/SavedRoutes";
import Navbar from "./components/Navbar";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={SearchRoutes} />
          <Route exact path="/saved" component={SavedRoutes} />
          <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
