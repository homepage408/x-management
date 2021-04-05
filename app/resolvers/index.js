const lodash = require("lodash");
const { resolvers: user } = require("./user");
const { resolvers: projectPlanner } = require("./projectPlanner");
const { resolvers: projectSupervisor } = require("./projectSupervisor");

const resolvers = lodash.merge(user, projectPlanner, projectSupervisor);

module.exports = {
  resolvers,
};
