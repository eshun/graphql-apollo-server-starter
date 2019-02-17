exports.datas = {
  users: function(count = 10) {
    const list = [];
    for (let i = 1; i < count; i += 1) {
      list.push({
        id: i,
        name: "esun" + i,
        email: "esun" + i + "@test.com",
        password: "123456",
        age: Math.ceil(Math.random() * 50),
        height: 175.0,
        birthDay: `2019-02-${Math.floor(i / 2) + 1}`
      });
    }
    return list;
  },
  posts: function(count = 10) {
    const list = [];
    for (let i = 1; i < count; i += 1) {
      list.push({
        id: i,
        authorId: Math.ceil(Math.random() * 10),
        title: "post" + i,
        content: "post content " + i,
        createdAt: `2019-02-${Math.floor(i / 2) + 1}`
      });
    }
    return list;
  }
};
