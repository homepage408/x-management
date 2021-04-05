const lodash = require("lodash");
const { resolvers: user } = require("./user");
const { resolvers: projectPlanner } = require("./projectPlanner");
const { resolvers: projectSupervisor } = require("./projectSupervisor");
const { resolvers: taskPlanner} = require("./taskPlanner")
const { resolvers: taskWorker} = require("./taskWorker")
const { resolvers: note} = require("./note")

const resolvers = lodash.merge(user, projectPlanner, projectSupervisor, taskPlanner,taskWorker,note);

module.exports = {
  resolvers,
};
