const { datas } = require("./data");

exports.resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!",
    users: (root, { count }) => {
      return datas.users(count);
    },
    user: (root, args, context) => {
      const { id, name } = args;
      const users = datas.users();
      if (id) {
        return users.find(user => user.id === id);
      }
      if (name) {
        return users.find(user => user.name === name);
      }
      throw new Error(`user id "${id}" or name "${name}" not supported.`);
    }
  },
  //Mutation: {},
  User: {
    posts: (parent, args, context) => {
      const posts = datas.posts().filter(post => post.authorId === parent.id);
      //const { first, offset } = args;

      return posts;
    },
    height: (parent, args) => {
      const { unit } = args;
      if (!unit || unit === "CENTIMETRE") return parent.height;
      else if (unit === "METRE") return parent.height / 100;
      throw new Error(`Height unit "${unit}" not supported.`);
    }
  },
  Post: {
    author: (parent, args, context) => {
      const users = datas.users();
      return users.find(user => user.id === parent.authorId);
    }
  }
};
