const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads'
    };

    // Database Connection
    this.dbStart();

    // Middleware
    this.middlewares();

    // Routes
    this.routes();
  }

  async dbStart() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parse Body
    this.app.use(express.json());

    // Public folder
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.users, require('../routes/user'));
    this.app.use(this.paths.categories, require('../routes/category'));
    this.app.use(this.paths.products, require('../routes/product'));
    this.app.use(this.paths.search, require('../routes/search'));
  }

  listen(port) {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;