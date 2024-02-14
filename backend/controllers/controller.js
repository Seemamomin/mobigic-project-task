const User = require("../schemas/user");
const UploadFile = require("../schemas/file");
const crypto = require("crypto");
const fs = require("fs");

// controller for generating unique 6 digit code
const uniqueNumber = () => {
  const timestamp = new Date().getTime();
  const randomChars = crypto.randomBytes(3).toString("hex");
  const combinedString = `${timestamp}${randomChars}`;
  const hash = crypto.createHash("sha256").update(combinedString).digest("hex");
  const uniqueString = hash.slice(0, 6);
  return uniqueString;
};

// controller for checking unique fields
const checkUniqueFields = async (req, res, next) => {
  const { userName } = req.body;
  try {
    const userSearch = await User.findOne({ userName });
    if (userSearch) {
      return res.status(409).json({ error: "Username already exists!" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller for registration
const register = async (req, res) => {
  try {
    const { userName, password } = req.body;
    let userData = await User.create({ userName, password });
    if (userData) return res.json({ message: "User registered!" });
  } catch (error) {
    console.error("Error in registration:", error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.userName) {
      return res.status(400).json({ error: "Duplicate Username" });
    } else {
      return res.status(500).json({ error: "Registration Error" });
    }
  }
};

// controller for login
const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful", uid: user._id });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller for file uploading
const upload = async (req, res) => {
  try {
    const { file } = req;
    const uniqueNo = uniqueNumber();
    const uid = JSON.parse(req.body.uid);

    const result = await UploadFile.create({
      uid: uid,
      originalName: file.originalname,
      fileName: file.filename,
      filePath: file.path,
      uniqueNo: uniqueNo,
    });

    if (result) return res.json({ message: "File uploaded!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller for getting uploaded files list
const getFileList = async (req, res) => {
  try {
    const { uid } = req.params;
    const fileList = await UploadFile.find({ uid });

    if (fileList) {
      res.json(fileList);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller for downloading file
const download = async (req, res) => {
  try {
    const { fileId } = req.params;
    const { code } = req.body;

    const file = await UploadFile.findById(fileId);

    if (file && file.uniqueNo === code) {
      const fileStream = fs.createReadStream(file.filePath);
      fileStream.pipe(res);
    } else {
      return res.status(401).json({ error: "Invalid code" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  checkUniqueFields,
  register,
  login,
  upload,
  getFileList,
  download,
};
