const bcrypt = require("bcrypt");
const salt_rounds = 12;
const multer = require("multer");
const path = require("path");

// for password hash
exports.hashPasswordFn = async function(plainPassword) {
  if (!plainPassword) throw new Error("Password is required to hash");
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, salt_rounds);
    return hashedPassword;
  } catch (error) {
      console.error("Error hashing password", error);
      throw new Error("Hashing failed")
  }
}

exports.comparePasswordFn = async function(plainPassword, hashedPassword) {
    if (!plainPassword || !hashedPassword) return false;
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error("Error compare password", error)
        throw new Error("Compare failed")
    }
}

// use multer for file upload
exports.fileUpload = async function(fieldName){
  const storege = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });

  const fileFileter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extanem(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("only images are allowed"));
    }
  }

  const upload = multer({
    storage: storege,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFileter,
  })
  return upload.single(fieldName)
}
