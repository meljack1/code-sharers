import { gql } from "@apollo/client"

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }`

export const SAVE_SNIPPET = gql`
    mutation saveSnippet($input: SnippetInput!){
        saveSnippet(input: $input){
            _id
            username
            email
            codeSnippets{
                name
                description
                language
                code
                createdOn
            }
        }
    }`

export const REMOVE_SNIPPET = gql`
    mutation removeSnippet($_id: ID!){
        removeSnippet(_id: $_id){
            _id
            username
            email
            codeSnippets{
                name
                description
                language
                code
                createdOn
            }
        }
    }`

export const UPDATE_SNIPPET = gql`
    mutation updateSnippet($input: updatedSnippetInput!){
        updateSnippet(input: $input){
            _id: ID
            name: String
            description: String
            language: String
            code: String
        }
    }`