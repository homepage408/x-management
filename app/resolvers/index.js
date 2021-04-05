const lodash = require("lodash");
const { resolvers: user } = require("./user");
const { resolvers: projectPlanner } = require("./projectPlanner");
const { resolvers: projectSupervisor } = require("./projectSupervisor");
const { resolvers: projectWorker } = require("./projectWorker");

const resolvers = lodash.merge(
  user,
  projectPlanner,
  projectSupervisor,
  projectWorker
);

module.exports = {
  resolvers,
};
