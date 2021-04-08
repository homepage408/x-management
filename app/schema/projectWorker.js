const { gql } = require("apollo-server-core");

const typeDefs = gql`
    extend type Query {
        findAllProjectWorker: [Project]
    }
    extend type Mutation {
        updateIsReadProjectWorker(id: Int, is_read: Boolean): Project
        updateStatusProjectWorker(id: Int, status: String): Project
    }
`
module.exports={
    typeDefs
}