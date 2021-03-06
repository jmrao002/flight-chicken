import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/react-hooks";
// import the query we're going to execute and the mutation
import { GET_ME } from "../utils/queries";
import { REMOVE_ROUTE } from "../utils/mutations";

import Auth from "../utils/auth";
import { removeRouteId } from "../utils/localStorage";

const SavedRoutes = () => {
  // execute the query on component load
  const { loading, data } = useQuery(GET_ME);
  const [removeRoute, { error }] = useMutation(REMOVE_ROUTE);
  // check to see if data is there and if not then return an empty array
  const userData = data?.me || [];

  const handleDeleteroute = async (routeId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeRoute({
        variables: { routeId },
      });

      removeRouteId(routeId);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved routes!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.SavedRoutes.length
            ? `Viewing ${userData.SavedRoutes.length} saved ${
                userData.SavedRoutes.length === 1 ? "route" : "routes"
              }:`
            : "You have no saved routes!"}
        </h2>
        <CardColumns>
          {userData.SavedRoutes.map((route) => {
            return (
              <Card key={route.routeId} border="dark">
                {route.image ? (
                  <Card.Img
                    src={route.image}
                    alt={`The cover for ${route.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{route.title}</Card.Title>
                  <p className="small">Authors: {route.authors}</p>
                  <Card.Text>{route.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteroute(route.routeId)}
                  >
                    Delete this route!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedRoutes;
