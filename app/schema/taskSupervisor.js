const { gpl } = require ("apollo-server-express")

const typeDefs = gpl`
    extend type Query {
        findAllTaskSpv : [Task]
    }

    type Task {
        id : Int
        project_id : Int
        task : String
        is_check : String
    }

    extend type Mutation {
        createTaskSpv(
            project_id : Int
            task : String
            is_check : String
        ): Task

        updateTaskSpv(
            id : Int
            project_id : Int
            task : String
            is_check : String
        ): Task

        deleteTaskSpv(
            id:Int
        ): Task
    }

`;
module.exports = {
    typeDefs,
}