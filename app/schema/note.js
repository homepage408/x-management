const { gql } = require("apollo-server-express")

const typeDefs = gql`
    extend type Query {
        findAllNote : [Note]
    }

    type Note {
        id : Int
        project_id : Int
        note : String
    }

    extend type Mutation {
        createNote(
            project_id : Int
            note : String
        ): Note

        updateNote(
            id : Int
            project_id : Int
            note : String
        ): Note

        deleteNote(
            id:Int
        ):Note
    }

`;
module.exports = {
    typeDefs,
}