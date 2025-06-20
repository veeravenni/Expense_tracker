const multer= require('multer');


const storage= multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Use a unique filename
    }       
});

const fileFilter = (req, file, cb) => {
   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
   if (allowedTypes.includes(file.mimetype.toLowerCase())) {
     cb(null, true); // Accept the file
   } else {
     cb(null, allowedTypes.includes(file.mimetype) ? true : false); // Reject the file
   }
}

const upload = multer({ storage,fileFilter});

module.exports = upload;
