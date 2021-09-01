import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from "react-bootstrap";
// import the mutation we're going to execute
import { SAVE_ROUTE } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { saveroute, searchSkyScannerRoutes } from "../utils/API";
import { saverouteIds, getSavedrouteIds } from "../utils/localStorage";

const searchRoutes = () => {
  const [searchedroutes, setSearchedroutes] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [savedrouteIds, setSavedrouteIds] = useState(getSavedrouteIds());

  const [saveroute, { error }] = useMutation(SAVE_ROUTE);

  useEffect(() => {
    return () => saverouteIds(savedrouteIds);
  });

  // function to search and to set state
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchSkyScannerRoutes(searchInput);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const { items } = await response.json();

      const routeData = items.map((route) => ({
        routeId: route.id,
        authors: route.volumeInfo.authors || ["No author to display"],
        title: route.volumeInfo.title,
        description: route.volumeInfo.description,
        image: route.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedroutes(routeData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // function to save route and add to state
  const handleSaveroute = async (routeId) => {
    const routeToSave = searchedroutes.find(
      (route) => route.routeId === routeId
    );

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveroute({
        variables: { input: routeToSave },
      });

      setSavedrouteIds([...savedrouteIds, routeToSave.routeId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for routes!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a route"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedroutes.length
            ? `Viewing ${searchedroutes.length} results:`
            : "Search for a route to begin"}
        </h2>
        <CardColumns>
          {searchedroutes.map((route) => {
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
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedrouteIds?.some(
                        (savedrouteId) => savedrouteId === route.routeId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveroute(route.routeId)}
                    >
                      {savedrouteIds?.some(
                        (savedrouteId) => savedrouteId === route.routeId
                      )
                        ? "This route has already been saved!"
                        : "Save this route!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default searchRoutes;
