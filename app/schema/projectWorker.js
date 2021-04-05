const { gql } = require("apollo-server-core");

const typeDefs = gql`
    extend type Query {
        findAllProjectWorker: Project
    }
    extend type Mutation {
        updateIsReadProjectPlanner(id: Int, is_read: Boolean): Project
    }
`
module.exports={
    typeDefs
}