import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        routeCount
        SavedRoutes {
          routeId
          title
          description
          authors
          image
          link
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
        email
        routeCount
        SavedRoutes {
          routeId
          title
          description
          authors
          image
          link
        }
      }
    }
  }
`;

export const SAVE_ROUTE = gql`
  mutation saveroute($input: savedroute!) {
    saveroute(input: $input) {
      _id
      username
      email
      routeCount
      SavedRoutes {
        # _id
        routeId
        title
        description
        authors
        image
        link
      }
    }
  }
`;

export const REMOVE_ROUTE = gql`
  mutation removeRoute($routeId: ID!) {
    removeRoute(routeId: $routeId) {
      _id
      username
      email
      routeCount
      SavedRoutes {
        # _id
        routeId
        title
        description
        authors
        image
        link
      }
    }
  }
`;
