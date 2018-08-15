const controller = require('../controllers/index').records;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API!',
    }));

    app.post('/api/add', controller.add);
    app.all('/api', (req, res) => res.status(405).send({
        message: 'Method Not Allowed',
    }));
};