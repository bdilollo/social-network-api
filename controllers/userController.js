const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;


module.exports = {
    getUsers(req, res) {
        User.find()
            .then((posts) => res.json(posts))
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
            .then((newUser) => res.json(newUser))
            .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .then((user) => 
                !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(post)
            )
            .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((updatedUser) => 
            !updatedUser
                ? res.status(404).json({ message: 'No user with this ID!' })
                : res.json(updatedUser)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((deletedUser) => 
                !deletedUser
                    ? res.status(404).json({ message: `Couldn't find a user with that ID!` })
                    : Thought.deleteMany({ _id: { $in: deletedUser.thoughts } })
                )
            .then((deletedUser) => res.json({ message: `Deleted user ${deletedUser.username} and all associated thoughts.`}))
            .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        res.send('addFriend route');
    },

    deleteFriend(req, res) {
        res.send('deleteFriend route');
    }
};