import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      routeCount
      savedRoutes {
        # _id
        routeId
        authors
        title
        description
        image
        link
      }
    }
  }
`;
