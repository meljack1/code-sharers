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
    input SnippetInput{
        name: String
        description: String
        language: String
        code: String
    }
    input updatedSnippetInput{
        _id: ID
        name: String
        description: String
        language: String
        code: String
    }
    type Auth {
        token: ID
        user: User
    }
    type Query {
        me: User
        snippets: [Snippet]
        snippetById(_id: ID!): Snippet
    }
    type Mutation {
        login(email: String!, password: String!) : Auth
        addUser(username: String!, email: String!, password: String!) : Auth
        saveSnippet(input: SnippetInput!) : User
        updateSnippet(input: updatedSnippetInput!) : Snippet
        removeSnippet(_id: ID!): User
    }
`;

module.exports = typeDefs;