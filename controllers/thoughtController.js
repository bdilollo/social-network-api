const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;


module.exports = {
    getThoughts(req, res) {
        res.send('getThoughts route');
    },
    createThought(req, res) {
        res.send('createThought route');
    },
    getSingleThought(req, res) {
        res.send('getSingleThought route');
    },
    updateThought(req, res) {
        res.send('updateThought route');
    },
    deleteThought(req, res) {
        res.send('deleteThought route');
    }
};