const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type route {
    _id: ID!
    routeId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  type User {
    _id: ID
    username: String
    email: String
    routeCount: Int
    savedRoutes: [route]
  }
  input savedroute {
    description: String
    title: String
    routeId: String
    image: String
    link: String
    authors: [String]
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveroute(input: savedroute!): User
    removeRoute(routeId: ID!): User
  }
  type Auth {
    token: ID
    user: User
  }
`;

module.exports = typeDefs;
