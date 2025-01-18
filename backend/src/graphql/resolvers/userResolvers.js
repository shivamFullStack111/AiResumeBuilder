const { Users } = require("../../schemas/userSchema");

const userResolver = {
  Query: {
    check: () => "Hello World",
  },
  Mutation: {
    register: async (_, { name, email, phoneNumber }) => {
      const isExist = await Users.findOne({ email });

      if (isExist) {
        throw new Error(`${email} already exists`);
      }

      const user = new Users({ name, email, phoneNumber });

      await user.save();

      return user;
    },
  },
};

module.exports = { userResolver };
