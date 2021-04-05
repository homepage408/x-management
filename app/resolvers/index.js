const lodash = require("lodash");
const { resolvers: user } = require("./user");
const { resolvers: projectPlanner } = require("./projectPlanner");
const { resolvers: projectSupervisor } = require("./projectSupervisor");
const { resolvers: projectWorker } = require("./projectWorker");

const { resolvers: taskPlanner} = require("./taskPlanner")
const { resolvers: taskWorker} = require("./taskWorker")
const { resolvers: note} = require("./note")

const resolvers = lodash.merge(user, projectPlanner, projectSupervisor, projectWorker,taskPlanner,taskWorker,note);


module.exports = {
  resolvers,
};
