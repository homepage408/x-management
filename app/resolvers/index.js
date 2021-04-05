const lodash = require("lodash");
const { resolvers: user } = require("./user");
const { resolvers: projectPlanner } = require("./projectPlanner");

const resolvers = lodash.merge(user, projectPlanner);

module.exports = {
  resolvers,
};
