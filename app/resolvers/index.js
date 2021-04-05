const lodash = require("lodash");
const { resolvers: user } = require("./user");
const { resolvers: projectPlanner } = require("./projectPlanner");
const { resolvers: taskPlanner } = require("./taskPlanner")

const resolvers = lodash.merge(user, projectPlanner, taskPlanner);

module.exports = {
  resolvers,
};
