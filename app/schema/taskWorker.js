const { gpl } = require ("apollo-server-express")

const typeDefs = gpl`
    extend type Query {
        findAllTaskWorker : [Task]
    }

    type Task {
        id : Int
        project_id : Int
        task : String
        is_check : String
    }

    extend type Mutation {
        createTaskWorker(
            project_id : Int
            task : String
            is_check : String
        ): Task

        updateTaskWorker(
            id : Int
            project_id : Int
            task : String
            is_check : String
        ): Task

        deleteTaskWorker(
            id:Int
        ): Task
    }

`;
module.exports = {
    typeDefs,
}