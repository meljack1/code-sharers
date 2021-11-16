const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User{
        _id: ID
        username: String
        email: String
        password: String
        codeSnippets: [Snippet]
    }
    type Snippet{
        _id: ID
        name: String
        description: String
        language: String
        code: String
        createdOn: String
        userId: User
    }
    type Auth {
        token: ID
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!) : Auth
        addUser(username: String!, email: String!, password: String!) : Auth
    }
`;

module.exports = typeDefs;