// Info: Use multer diskstorage to save images.

// Requires
const multer = require('multer');

const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

// Image filetypes
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Storage configuration
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images');
  },
		filename: (req, file, callback) => {
			let name = file.originalname.split(' ').join('_');
			let extension = MIME_TYPES[file.mimetype];
			name = name.replace("." + extension, "_");
		callback(null, name + Date.now() + '.' + extension);
	  }
});



 // Storing single image
 module.exports = multer({
 storage: storage
 }).single('image');