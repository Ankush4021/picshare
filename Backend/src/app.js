// server ko create karna 

const express = require('express');
const app = express();
const multer = require('multer');
const uploadFile = require('./services/storage.services');
const postModel = require('./models/post.model');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });


app.post("/create-post", upload.single("image"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    });

    return res.status(201).json({
        message: 'Post Created Succesfully',
        post
    })
})

app.get("/posts", async (req, res) => {
    const posts = await postModel.find().sort({ createdAt: -1 })

    return res.status(200).json({
        message: "Posts Fetched Successfully",
        posts
    })
})


app.delete("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deletedPost = await postModel.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            message: "Post deleted successfully",
            post: deletedPost
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to delete post",
            error: error.message
        });
    }
});


module.exports = app;