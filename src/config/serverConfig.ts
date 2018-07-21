import path from "path";

export default {
  get staticFilesDir () {
    return path.join(__dirname, "..", "public");
  }
};