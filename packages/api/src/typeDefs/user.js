import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    me: User @auth
    user(id: ID!): User @auth
    users: [User!]! @auth
  }

  extend type Mutation {
    signUp(
      email: String!
      phone: String!
      name: String!
      password: String!
    ): User @guest
    signIn(email: String!, password: String!): User @guest
    signOut: Boolean @auth
  }

  type User {
    id: ID!
    name: String!
    email: String!
    phone: String!
    role: Role!
    image: ProfilePicture
    createdAt: String!
    updatedAt: String!
  }

  type ProfilePicture {
    src: String
  }

  enum Role {
    ADMIN
    MODERATOR
    USER
  }
`
