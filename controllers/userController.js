const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose');


module.exports = {
    getUsers(req, res) {
        User.find()
            .select('-__v')
            .then((posts) => res.json(posts))
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .select('-__v')
            .then((newUser) => res.json(newUser))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((user) => 
                !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user)
            )
            .catch((err) => console.log(err))
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .select('-__v')
        .then((updatedUser) => 
            !updatedUser
                ? res.status(404).json({ message: 'No user with this ID!' })
                : res.json(updatedUser)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((deletedUser) => {
            if(!deletedUser) {
                res.status(404).json({ message: `Couldn't find a user with that ID!` })
            }
            Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            return deletedUser;
    })        
        .then(res.json({ message: `Deleted user ${deletedUser.username} and all associated thoughts.`}))
        .catch((err) => res.status(500).json(err))
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .select('-__v')
        .then((updatedUser) => 
            !updatedUser
                ? res.status(404).json({ message: 'No user with that ID!' })
                : res.json(updatedUser)
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((updatedUser) =>
            !updatedUser
                ? res.status(404).json({ message: 'No user with that ID!' })
                : res.json(updatedUser)
        )
        .catch((err) => res.status(500).json(err))
    }
};