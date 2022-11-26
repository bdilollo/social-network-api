const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;


module.exports = {
    getUsers(req, res) {
        res.send('getUsers route');
    },
    createUser(req, res) {
        res.send('createUser route');
    },
    getSingleUser(req, res) {
        res.send('getSingleUser route');
    },
    updateUser(req, res) {
        res.send('updateUser route');
    },
    deleteUser(req, res) {
        res.send('deleteUser route');
    },
    addFriend(req, res) {
        res.send('addFriend route');
    },
    deleteFriend(req, res) {
        res.send('deleteFriend route');
    }
};