import express from 'express';
//controller: (.js is necessary in node)
import { getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, deletePost, commentPost } from '../controllers/posts.js';
/* callback function: (found in controllers)
router.get('/', (req,res) => {
res.send('this works')
});
*/
const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
//updating existing documents
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

export default router;