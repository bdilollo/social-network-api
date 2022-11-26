const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: use a getter method to format the timestamp on query
        },
        username: {

        },
        reactions: [reactionSchema]
    },
    {
        timestamps: true
    }
);