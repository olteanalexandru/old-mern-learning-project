import express from 'express';
import mongoose from 'mongoose';
//MODEL(database schema):
import PostMessage from '../models/postMessage.js';

const router = express.Router();

//handlers for routes - logic/functions inside routes-------------------------------------CALLBACK FUNCTIONS only

export const getPosts = async (req, res) => { 
    const { page } = req.query;
    try {
         //find inside model takes time, it`s an asynchronous action 
        //so we add await to make it asynchronous and declare as such
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

//query -> /posts?page=1 -> page = 1
//PARAMS-> /posts/123    -> id = 123
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        //"i" = ignore case 
        const title = new RegExp(searchQuery, "i");
                 //find posts that match eigher title or tags, is one of the tags ==  tags ? => display posts
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const createPost = async (req, res) => {
    const post = req.body;
                                                //passing values received from req.body
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();
//sending newPostMessage
        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    //fetching id , value from frontend API
    const { id } = req.params;
    const { value} = req.body;
    //getting post from database
    const post = await PostMessage.findById(id);
    //adding the comments to that post
    post.comments.push(value);
    //updating database with new comment and storing in updatedpost const
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true});
    //returning the updated post to be receiven on frontend
    res.json(updatedPost);


}

export default router;