import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '../temp'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploads = multer({ storage: storage });

export default uploads;
