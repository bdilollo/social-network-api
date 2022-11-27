const { Thought, User } = require('../models');
const { ObjectId } = require('mongoose').Types;


module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    
    createThought(req, res) {
        Thought.create(req.body)
            .then((newThought) => {
                return User.findOneAndUpdate(
                        { username: req.body.username },
                        { $push: { thoughts: newThought._id }},
                        { new: true }
                    )
            })
            .then((updatedUser) =>
                !updatedUser
                    ? res.status(404).json({ message: 'Thought created, but no user found with that username.' })
                    : res.json(`Created new thought from ${updatedUser.username}!`)
            )
            .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => 
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((updatedThought) => 
            !updatedThought
                ? res.status(404).json({ message: 'No thought with that ID!' })
                : res.json(updatedThought)
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((deletedThought) =>
                !deletedThought
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((updatedUser) =>
                !updatedUser
                    ? res.status(404).json({ message: 'Thought deleted, but no associated user found' })
                    : res.json({ message: 'Thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err))
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((updatedThought) =>
            !updatedThought
                ? res.status(404).json({ message: 'No thought with that ID!' })
                : res.json(updatedThought)
        )
        .catch((err) => res.status(500).json(err))
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((updatedThought) => 
            !updatedThought
                ? res.status(404).json({ message: 'No thought with that ID!' })
                : res.json(updatedThought)
        )
        .catch((err) => res.status(500).json(err))
    }
};