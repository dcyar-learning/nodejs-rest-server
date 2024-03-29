const express = require('express');
const cors = require('cors');

const morgan = require('morgan');
const { dbConnection } = require('./config/db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/auth', require('./routes/auth.routes'));
        this.app.use('/api/users', require('./routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = Server;
