const moongoose = require('mongoose');

const Schema = moongoose.Schema;
const PostSchema = new Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = moongoose.model('post', PostSchema)