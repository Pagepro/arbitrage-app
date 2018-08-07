import path from "path";

export default {
  get staticFilesDir () {
    return path.join(__dirname, "..", "public");
  }
};

export const expireTime = 1209600;