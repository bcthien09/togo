const config = {
    db: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      databaseName: process.env.MYSQL_DATABASE,
    },
    page: 1,
    listItemPage: 20,
    externalApis: {
      
    },
  };

  module.exports = config;
