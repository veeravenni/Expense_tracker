const express= require("express");
const {protect} = require('../middleware/authMiddleware');
const{
    registerUser,
    loginUser,
    getUserInfo,
}= require('../controllers/authController');
const upload = require('../middleware/uploadMiddleware'); // Assuming you have a middleware for handling file uploads


const router = express.Router();
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get('/getUser',protect, getUserInfo);

router.post("/upload-image",upload.single("image"),(req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ message: "Image uploaded successfully", imageUrl });

});

module.exports = router;