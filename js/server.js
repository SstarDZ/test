const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.static('.'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'img/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// قبول عدة صور تحت اسم 'images'
app.post('/upload', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'لم يتم اختيار أي صورة' });
  }
  const imagePaths = req.files.map(file => `img/${file.filename}`);
  res.json({ imagePaths });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));