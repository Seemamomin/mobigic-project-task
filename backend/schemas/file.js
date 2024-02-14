const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const UploadFile = Schema({
  uid: Schema.Types.ObjectId,
  originalName: String,
  fileName: {
    type: String,
    unique: true,
  },
  filePath: {
    type: String,
    unique: true,
  },
  uniqueNo: {
    type: String,
    unique: true,
  },
});

UploadFile.index({ uid: 1, uniqueNo: 1 });

module.exports = mongoose.model("UploadFile", UploadFile);
