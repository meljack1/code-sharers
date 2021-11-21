import { gql } from "@apollo/client"

export const GET_ME = gql`
query{
    me {
        _id
        username
        email
        codeSnippets{
            _id
            name
            description
            language
            code
            createdOn
        }
    }
}`

export const SNIPPETS = gql`
    query{
        snippets{
        _id
        name
        description
        language
        code
        createdOn
        userId {
            username
            }
        }
    }`

export const SNIPPET_BY_ID = gql`
    query snippetById($_id: ID!){
        snippetById(_id: $_id) {
        _id
        name
        description
        language
        code
        createdOn
        userId {
            username
            }
        }
    }`
