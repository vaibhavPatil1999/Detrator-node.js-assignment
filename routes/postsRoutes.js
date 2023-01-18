const express = require("express");
const router = express.Router();
const { uploadPost, getPosts } = require("../controllers/postsController");

/**
 * name:uploading post
 * method:POST
 * route:upload-post
 * description:to check this route use postman with this format - 
    body:raw
    format:json
    bodySchema: {
                  "user_id":212,
                  "filename":"hello"
                }           
                
*/
router.post("/upload-post", uploadPost);

/**
 * name:fetching posts
 * method:GET
 * route:get-posts
 */
router.get("/get-posts", getPosts);

module.exports = { router };
