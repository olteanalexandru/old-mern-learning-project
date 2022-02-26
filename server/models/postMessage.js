import mongoose from 'mongoose';
 //                   mongoose.Schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: {type: [String], default: []},
    createdAt: {
        type: Date,
        default: new Date(),
    },
})
//transforming the schema into a model using moongose
const PostMessage = mongoose.model('PostMessage',postSchema);
//see post controller
export default PostMessage;