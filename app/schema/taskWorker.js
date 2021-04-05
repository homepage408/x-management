const { gql } = require ("apollo-server-express")

const typeDefs = gql`
    extend type Query {
        findAllTaskWorker : [Task]
    }

    extend type Mutation {
        isCheck(
            id : Int
            is_check : String
        ): Task
    }

`;
module.exports = {
    typeDefs,
}