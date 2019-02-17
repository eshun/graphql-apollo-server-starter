const { gql } = require("apollo-server");

exports.typeDefs = gql`
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
  分页
  """
  type Pagination {
    list: [Post]
    total: Int
    pageSize: Int
    current: Int
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
    users(count: Int): [User]
    user(id: Int, name: String): User
  }
`;
