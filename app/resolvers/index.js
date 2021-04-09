const lodash = require("lodash");
const { resolvers: user } = require("./user");
const { resolvers: projectPlanner } = require("./projectPlanner");
const { resolvers: projectSupervisor } = require("./projectSupervisor");
const { resolvers: projectWorker } = require("./projectWorker");

const { resolvers: taskPlanner} = require("./taskPlanner")
const { resolvers: taskWorker} = require("./taskWorker")
const { resolvers: noteWorker} = require("./noteWorker")
const { resolvers: noteSupervisor} = require("./noteSupervisor")
const { resolvers: taskSupervisor} = require("./taskSupervisor")


const resolvers = lodash.merge(user, projectPlanner, projectSupervisor, projectWorker,taskPlanner,taskWorker,noteWorker,noteSupervisor,taskSupervisor);


module.exports = {
  resolvers,
};
