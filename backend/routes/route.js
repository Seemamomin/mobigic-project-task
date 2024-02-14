const express = require("express");
const {
  register,
  login,
  upload,
  checkUniqueFields,
  getFileList,
  download,
} = require("../controllers/controller");
const fileUpload = require("../middleware/uploadFile");
const route = express.Router();

// route for registration of user
route.post("/register", checkUniqueFields, register);

// route for user login
route.post("/login", login);

// route for file upload
route.post("/upload", fileUpload.single("file"), upload);

// route for downloading file
route.post('/download/:fileId', download);

// route for getting list of files
route.get("/get-file-list/:uid", getFileList);

module.exports = route;
