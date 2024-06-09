import multer from 'multer';

// Konfigurasi penyimpanan multer
const storage = multer.memoryStorage(); // Menggunakan penyimpanan di memori

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Batasan ukuran file 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only images are allowed!'), false);
    }
  },
});

export default upload;
