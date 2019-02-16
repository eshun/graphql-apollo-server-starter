const { datas } = require("./data");

const findUserById = id => datas.users.find(user => user.id === id);
const findUserByName = name => datas.users.find(user => user.name === name);
const filterPostsByAuthorId = authorId =>
  datas.posts.filter(post => post.authorId === authorId);

exports.resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!",
    me: (root, args, { userId }) => {
      return findUserById(userId);
    },
    users: () => datas.users,
    user: (root, { name }, context) => {
      return findUserByName(name);
    }
  },
  User: {
    posts: (parent, args, context) => {
      return filterPostsByAuthorId(parent.id);
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
      return findUserById(parent.authorId);
    }
  }
};
