const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  """
  用户
  """
  type User {
    "主键"
    id: ID!
    "邮箱"
    email: String!
    "用户名"
    name: String
    "年龄"
    age: Int
    "生日"
    birthDay: String
    "身高"
    height(unit: HeightUnit = CENTIMETRE): Float
    "文章"
    posts: [Post]
  }

  """
  文章
  """
  type Post {
    "主键"
    id: ID!
    "作者"
    author: User
    "标题"
    title: String
    "內容"
    content: String
    "发布时间"
    createdAt: String
  }

  """
  升高
  """
  enum HeightUnit {
    "米"
    METRE
    "厘米"
    CENTIMETRE
  }

  type Query {
    hello: String
    me: User
    users: [User]
    user(name: String!): User
  }
`;

const datas = generateDatas();
const findUserById = id => datas.users.find(user => user.id === id);
const findUserByName = name => datas.users.find(user => user.name === name);
const filterPostsByAuthorId = authorId =>
  datas.posts.filter(post => post.authorId === authorId);

// Provide resolver functions for your schema fields
const resolvers = {
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

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

function generateDatas() {
  return {
    users: [
      {
        id: 1,
        name: "Fong",
        email: "fong@test.com",
        password: "123456",
        age: 25,
        height: 175.0,
        birthDay: "1997-07-12"
      },
      {
        id: 2,
        name: "Kevin",
        email: "kevin@test.com",
        password: "kevin123456",
        age: 40,
        height: 175.0,
        birthDay: "1997-07-12"
      },
      {
        id: 3,
        name: "Mary",
        email: "Mary@test.com",
        password: "mary123456",
        age: 18,
        height: 175.0,
        birthDay: "1997-07-12"
      }
    ],
    posts: [
      {
        id: 1,
        authorId: 1,
        title: "Hello World!!",
        content: "This is my first post. Nice to see you guys.",
        createdAt: "2018-10-15"
      },
      {
        id: 2,
        authorId: 2,
        title: "Hello World!!",
        content: "This is my first post. Nice to see you guys.",
        createdAt: "2018-10-15"
      },
      {
        id: 3,
        authorId: 3,
        title: "Hello World!!",
        content: "This is my first post. Nice to see you guys.",
        createdAt: "2018-10-15"
      },
      {
        id: 4,
        authorId: 4,
        title: "Hello World!!",
        content: "This is my first post. Nice to see you guys.",
        createdAt: "2018-10-15"
      },
      {
        id: 5,
        authorId: 1,
        title: "Hello World!!",
        content: "This is my first post. Nice to see you guys.",
        createdAt: "2018-10-15"
      }
    ]
  };
}
