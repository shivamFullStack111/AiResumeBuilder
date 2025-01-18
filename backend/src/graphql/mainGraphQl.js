const { userTypeDef } = require("./typedefs/userTypeDef");
const { userResolver } = require("./resolvers/userResolvers");
const { resumeTypeDef } = require("./typedefs/resumeTypeDef");
const { resumeResolver } = require("./resolvers/resumeResolvers");

const typeDefs = `
${userTypeDef}
${resumeTypeDef}
`;

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...resumeResolver?.Query,
  },

  Mutation: {
    ...userResolver?.Mutation,
    ...resumeResolver?.Mutation,
  },
};

module.exports = { typeDefs, resolvers };
