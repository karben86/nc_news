const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news',
      username: 'karben86',
      password: 'hello'
    }
  },
  test: {
    connection: {
      database: 'nc_news_test',
      username: 'karben86',
      password: 'hello'
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
