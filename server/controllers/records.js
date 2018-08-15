// const mongoose = require('mongoose');
const record = require('./../models/record');

module.exports = {
    add(req, res) {
        let result = [];
        req.body.records.forEach((el) =>{
            const newRecord = new record({
                ...el
            });

            newRecord.save(newRecord).then(data => result.push(data));
        });
        res.json(result);
    }
};
